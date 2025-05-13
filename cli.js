#!/usr/bin/env node
const crypto = require("crypto");
const cypress = require("cypress");
const { execSync } = require("child_process");
const fs = require("fs");
const { glob } = require("glob");
const { hideBin } = require("yargs/helpers");
const inquirer = require("inquirer");
const yargs = require("yargs/yargs");

const RESOLUTION_CHOICES = [
  { name: "1920x1080", checked: true },
  "1440x900",
  "1366x768",
  "800x600",
  "768x1024",
  "375x667",
];

const BROWSER_CHOICES = ["chrome", "electron", "webkit", "firefox", "edge"];

class JobPool {
  /**
   * Creates a new job pool instance
   *
   * @param {int} maxThreads Maximum threads to run concurently in parallel
   */
  constructor(maxThreads = 1) {
    this.queuedJobs = [];
    this.maxThreads = maxThreads;
  }

  /**
   * Adds a job to the queue
   *
   * @param {Object} param
   * @param {Function} param.job The job to run
   * @param {Function} param.onError Call back for error state
   */
  addJob({ job = async () => {}, onError = async () => {} }) {
    this.queuedJobs.push({ job, onError });
  }

  async __runJob(iter) {
    const results = [];
    for (let [i, { job, onError }] of iter) {
      try {
        const result = await job();
        results.push(result);
      } catch (e) {
        console.error(e);
        onError();
      }
    }

    return results;
  }

  /**
   * Runs all remaining jobs in the queue
   *
   * @returns Results of each worker
   */
  async run() {
    // Create job workers
    const workers = new Array(this.maxThreads)
      .fill(this.queuedJobs.entries())
      .map(this.__runJob);

    // Wait for all jobs to complete
    const results = await Promise.allSettled(workers);
    this.queuedJobs = [];

    return results;
  }
}

/**
 * Gets a list of all *.cy.js files in cypress/e2e/
 * @returns An array of objects with short names and full paths, for example:
 *          [
 *            {name: 'short name', value: 'path'},
 *            {name: 'short name', value: 'path'}
 *          ]
 */
async function getSpecOptions() {
  // Get spec files by glob
  const specFiles = (await glob("cypress/e2e/**/*.cy.js")).sort();

  // Convert to object with short names and full paths
  const specOptions = [];
  for (const specFile of specFiles) {
    specOptions.push({
      name: specFile.replace("cypress/e2e/app/", ""),
      value: specFile,
    });
  }

  return specOptions;
}

/**
 * Gets individual spec files from a pattern and removes any ignores
 *
 * @param {object} param
 * @param {object} param.specs spec pattern to include
 * @param {object} param.ignoreSpecs spec pattern to ignore
 * @returns All spec files minus the ignored files
 */
async function diffSpecs({ specs, ignoreSpecs }) {
  // Determine spec files
  let specFiles;
  if (!specs) {
    // Nothing specified, all files
    specFiles = (await glob("**/*.cy.js")).sort();
  } else if (specs.includes(",")) {
    // Multiple patterns, split by ',' and trim
    specs = specs.split(",").map((s) => s.trim());
    specFiles = await glob(specs);
  } else {
    // One pattern
    specFiles = await glob(specs);
  }

  // Determine ignored spec files
  let ignoreSpecFiles;
  if (ignoreSpecs) {
    if (ignoreSpecs.includes(",")) {
      // Multiple patterns, split by ',' and trim
      ignoreSpecs = ignoreSpecs.split(",").map((s) => s.trim());
      ignoreSpecFiles = await glob(ignoreSpecs);
    } else {
      // One pattern
      ignoreSpecFiles = await glob(ignoreSpecs);
    }
  }

  // Remove any non cypress spec files
  specFiles = specFiles.filter((s) => s.endsWith(".cy.js"));

  // Determine spec files to return
  if (ignoreSpecFiles) {
    // Diff spec files with ignored files
    return specFiles.filter((s) => !ignoreSpecFiles.includes(s));
  } else {
    // Return spec files
    return specFiles;
  }
}

/**
 * Runs the test suite with various options
 *
 * @param {object} param
 * @param {boolean} param.parallel True to run all resolutions in parallel
 * @param {number} param.threads Number of parallel threads if running parallel
 * @param {string} param.browser Browser to run in
 * @param {boolean} param.headed If browser should be displayed
 * @param {array<string>} param.resolutions Browser resolutions to run at
 * @param {boolean} param.html If an HTML report should be generated
 * @param {boolean} param.xml If an XML report should be generated
 * @param {string} param.spec Spec file(s) to run
 * @param {string} param.ignoreSpec Spec file(s) to ignore
 * @param {string} param.retries Number of times to retry failed tests
 * @returns True if everything passed, false if any failures
 */
async function runSuite({
  parallel = false,
  threads = 1,
  browser = "chrome",
  headed = false,
  resolutions = undefined,
  html = false,
  xml = false,
  specs = undefined,
  ignoreSpecs = undefined,
  retries,
}) {
  // Clean the report dir
  cleanReportDir();

  // Get an array of every resolution to run at
  let runResolutions = [];
  for (const resolution of resolutions) {
    const resComponents = resolution.split("x");
    const width = resComponents[0];
    const height = resComponents[1];
    runResolutions.push([parseInt(width), parseInt(height)]);
  }

  // Check if no resolutions specified
  if (runResolutions.length == 0) {
    throw new Error("No resolutions specified");
  }

  // Replace resolutions with parsed resolutions
  resolutions = runResolutions;

  // Get files from spec pattern and remove ignored specs
  specs = await diffSpecs({ specs, ignoreSpecs });
  console.log(
    "Specs: " + specs.map((s) => s.replace("cypress/e2e/app/", "")).join(", ")
  );

  // Create a JobPool with every spec to run at each resolution
  const maxThreads = parallel ? threads : 1;
  const specPool = new JobPool(maxThreads);
  for (const r in resolutions) {
    for (const s in specs) {
      const resolution = resolutions[r];
      const spec = specs[s];
      const cypressArgs = {
        resolution,
        spec,
        headed,
        browser,
        retries,
      };

      // Add a job for the cypress spec/resolution
      specPool.addJob({
        job: async () => runCypress(cypressArgs),
      });
    }
  }

  // Run all of the jobs in the pool and collect cypress results
  const poolResults = await specPool.run();

  // Count Cypress runtime (not test) failures
  let cyFailures = 0;
  for (const result of poolResults) {
    if (result.status.toLowerCase() == "failed") {
      cyFailures += 1;
    }
  }

  // If Cypress runtime failures, do not coninue to process reports
  if (cyFailures > 0) {
    return false;
  }

  // Generate reports
  if (html) {
    generateHtmlReport();
  }
  if (xml) {
    generateXmlReport();
  }

  // Determine total number of test failures:
  let failures = 0;
  for (const result of poolResults) {
    if ("value" in result) {
      for (const v of result["value"]) {
        if ("totalFailed" in v) {
          failures += v["totalFailed"];
        }
      }
    }
  }

  // Return true only of 0 total failures
  return failures > 0 ? false : true;
}

/**
 * Cleans the report dir
 */
function cleanReportDir() {
  console.log(
    execSync(
      "npx rimraf cypress/results; npx rimraf cypress/downloads; npx rimraf xunit.xml",
      { encoding: "utf-8" }
    )
  );
}

/**
 * Runs an external command to generate an HTML report
 */
function generateHtmlReport() {
  // Merge the report components
  console.log(
    execSync(
      "npx mochawesome-merge cypress/results/*.json -o cypress/results/report.json",
      { encoding: "utf-8" }
    )
  );

  // Generate the report
  console.log(
    execSync(
      "npx marge cypress/results/report.json --charts true --reportDir cypress/results --reportFilename full-report.html",
      // "npx marge cypress/results/report.json --charts true --reportDir cypress/results --reportFilename full-report.html && sleep 5",
      { encoding: "utf-8" }
    )
  );
}

/**
 * Runs an external command to generate an XML report (useful for CI)
 */
function generateXmlReport() {
  // Merge report components to xml
  console.log(
    execSync("npx jrm xunit.xml './cypress/results/junit/*.xml'", {
      encoding: "utf-8",
    })
  );
}

/**
 * Runs an instance of Cypress
 *
 * @param {object} param
 * @param {array<int>} param.resolution Browser resolution [(int)w, (int)h]
 * @param {string} param.spec Spec file(s) to run
 * @param {string} param.browser Which browser to use
 * @param {boolean} param.headed If browser is headed (true) or headless (false)
 * @param {string} param.retries Number of times to retry failed tests
 * @returns Cypress results object
 */
async function runCypress({
  resolution,
  spec,
  browser = "chrome",
  headed,
  retries,
}) {
  // Deconstruct browser resolution to width/height
  const [viewportWidth, viewportHeight] = resolution;

  // Generate report filename
  const reportKey = crypto.randomUUID();
  const reportFilename = `results-${viewportWidth}x${viewportHeight}-${reportKey}`;

  // Run and return the results from the Cypress instance
  const results = await cypress
    .run({
      reporter: "cypress-multi-reporters",
      // reporterOptions: "configFile=reporter-config.json",
      reporterOptions: {
        reporterEnabled: "mochawesome, mocha-junit-reporter",
        mochawesomeReporterOptions: {
          reportDir: "cypress/results/",
          overwrite: "true",
          html: "true",
          reportFilename,
        },
        mochaJunitReporterReporterOptions: {
          reportDir: "cypress/results/",
          mochaFile: `cypress/results/junit/${reportFilename}-[hash].xml`,
        },
      },
      browser,
      headed,
      spec,
      config: { viewportWidth, viewportHeight, retries },
    })
    .catch((err) => console.log(err));

  // Add resolution to describe blocks in reports
  await addReportResolutionContext({
    reportKey,
    viewportWidth,
    viewportHeight,
  });

  return results;
}

/**
 * Adds the browser resolution to the describe block in the report files
 *
 * @param {object} param
 * @param {string} param.reportKey Key of the report files to process
 * @param {number} param.viewportWidth Browser resolution width
 * @param {number} param.viewportHeight Browser resolution height
 */
async function addReportResolutionContext({
  reportKey,
  viewportWidth,
  viewportHeight,
}) {
  // Format browser resolution as a string
  const resolutionStr = `${viewportWidth}x${viewportHeight}`;

  // // //  Mochawesome (for HTML reports)  // // //

  // Get report files relevant to this resolution context
  const mochawesomeFiles = await glob(`cypress/results/**/*${reportKey}*.json`);

  // Modify each mochawesome report json file
  for (const jsonFile of mochawesomeFiles) {
    // Read file as JSON
    const reportJson = JSON.parse(fs.readFileSync(jsonFile, "utf-8"));
    for (const result of reportJson.results) {
      for (const suite of result.suites) {
        // Add browser resolution to each suite title
        suite.title = `${resolutionStr}: ${suite.title}`;
      }
    }

    // Save the modified report file
    fs.writeFileSync(jsonFile, JSON.stringify(reportJson, null, 2));
  }

  // // //  junit  (for XML reports) // // //

  // Get report files relevant to this resolution context
  const junitFiles = await glob(`cypress/results/**/*${reportKey}*.xml`);

  // Modify each mochawesome report json file
  for (const xmlFile of junitFiles) {
    // Read file as JSON
    let reportXml = fs.readFileSync(xmlFile, "utf-8");

    // Add resolution context
    reportXml = reportXml.replace(
      /<testsuite name="/g,
      `<testsuite name="${resolutionStr}: `
    );

    reportXml = reportXml.replace(
      /<testcase name="/g,
      `<testcase name="${resolutionStr}: `
    );

    // Save the modified report file
    fs.writeFileSync(xmlFile, reportXml);
  }
}

/**
 * Wait for a defined number of milliseconds
 *
 * @param {int} ms Milliseconds to wait
 * @returns
 */
// async function sleep(ms) {
//   return await new Promise((resolve) => setTimeout(resolve, ms));
// }

/**
 * Parse arguments from the CLI
 *
 * @returns CLI arguments object
 */
function parseCliArgs() {
  const argv = yargs(hideBin(process.argv))
    .option("parallel", {
      alias: "p",
      type: "boolean",
      desc: "enables paralell runs",
    })
    .option("threads", {
      alias: "t",
      type: "number",
      default: 4,
      desc: "max number of paralell executions",
    })
    .option("browser", {
      alias: "b",
      type: "string",
      desc: "browser to run on",
    })
    .option("headed", {
      type: "boolean",
      desc: "display the browser",
    })
    .option("resolutions", {
      alias: "r",
      type: "array",
      desc: "browser resolutions to run at\n(e.g. 1920x1080 800x600)",
      default: "1920x1080",
    })
    .option("html", {
      alias: "H",
      type: "boolean",
      desc: "Output report as HTML",
    })
    .option("xml", {
      alias: "X",
      type: "boolean",
      desc: "Output report as XML",
    })
    .option("spec", {
      alias: "s",
      type: "string",
      desc: 'runs specific spec file(s). defaults to "all"',
    })
    .option("ignore-spec", {
      alias: "i",
      type: "string",
      desc: "ignores specific spec file(s).",
    })
    .option("retries", {
      alias: "R",
      type: "int",
      desc: "number of times to retry failed tests",
      default: 0,
    })
    .option("interactive", {
      alias: "I",
      type: "boolean",
      desc: "configure runtime parameters interactively",
    })
    .parse();

  if (process.argv.length < 3) {
    // Nothing specified, show interactive mode
    argv.interactive = true;
  }

  return argv;
}

/**
 * Interactively prompt the user for CLI arguments
 *
 * @param {object} param
 * @param {object} param.defaults Initial arguments to start with
 * @returns CLI arguments as configured by user interactively
 */
async function promptArgs({ defaults }) {
  const args = defaults;

  // Spec files
  args.spec = (
    await inquirer.prompt([
      {
        type: "checkbox",
        name: "spec",
        message: "Select *.cy.js files to run",
        choices: await getSpecOptions(),
      },
    ])
  ).spec.join(",");

  // Ignore spec files
  args.ignoreSpec = (
    await inquirer.prompt([
      {
        type: "checkbox",
        name: "ignoreSpec",
        message: "Select *.cy.js files to ignore",
        choices: await getSpecOptions(),
      },
    ])
  ).ignoreSpec.join(",");

  // Output report formats
  response = await inquirer.prompt([
    {
      type: "checkbox",
      name: "reportFormat",
      message: "Output report format(s)",
      choices: [
        { name: "html", value: "html", checked: true },
        { name: "xml", value: "xml", checked: defaults.xml },
      ],
    },
  ]);
  args.html = response.reportFormat.includes("html");
  args.xml = response.reportFormat.includes("xml");

  // Browser resolutions
  response.resolutions = [];
  while (response.resolutions.length < 1) {
    response = await inquirer.prompt([
      {
        type: "checkbox",
        name: "resolutions",
        message: "Browser resolution(s)",
        choices: RESOLUTION_CHOICES,
      },
    ]);
  }
  args.resolutions = response.resolutions;

  // Browser
  args.browser = (
    await inquirer.prompt([
      {
        type: "list",
        name: "browser",
        message: "Browser type",
        choices: BROWSER_CHOICES,
      },
    ])
  ).browser;

  // Browser visibility
  args.headed =
    (
      await inquirer.prompt([
        {
          type: "list",
          name: "browserVisibility",
          message: "Browser visibility",
          choices: ["headless", "headed"],
        },
      ])
    ).browserVisibility == "headed";

  // Run mode
  args.parallel =
    (
      await inquirer.prompt([
        {
          type: "list",
          name: "runMode",
          message: "Run type",
          choices: ["sequential", "parallel"],
        },
      ])
    ).runMode == "parallel";

  if (args.parallel) {
    args.threads = (
      await inquirer.prompt([
        {
          type: "list",
          name: "threads",
          message: "max number of parallel executions",
          choices: [2, 3, 4, 5, 6, 7, 8],
        },
      ])
    ).threads;
  } else {
    args.threads = 1;
  }

  args.retries = (
    await inquirer.prompt([
      {
        type: "list",
        name: "retries",
        message: "Number of times to retry failed tests",
        choices: [0, 1, 2, 3, 4, 5],
      },
    ])
  ).retries;

  return args;
}

/**
 * Logs a CLI argument object from yargs as a callable cli string
 *
 * @param {object} param
 * @param {object} param.argv CLI arguments object
 */
function logArgs({ argv }) {
  // Get a string of configured CLI flags
  const flags = [
    argv.parallel ? "--parallel" : "",
    argv.threads > 1 ? `--threads ${argv.threads}` : "",
    argv.browser ? `--browser ${argv.browser}` : "",
    argv.headed ? "--headed" : "",
    argv.resolutions ? `--resolutions ${argv.resolutions.join(" ")}` : "",
    argv.html ? "--html" : "",
    argv.xml ? "--xml" : "",
    argv.retries ? `--retries ${argv.retries}` : "",
    argv.spec ? `--spec ${argv.spec}` : "",
    argv.spec ? `--ignore-spec ${argv.ignoreSpec}` : "",
  ]
    .filter((f) => f)
    .join(" ");

  // Log the CLI command
  const command = `node cli.js ${flags}`;
  console.log(command);

  return command;
}

/**
 * Main entry point
 */
async function main() {
  // Get CLI args from command line
  let argv = parseCliArgs();

  let cliArgLine;
  let isFullPass = false;

  // Interactively prompt and override CLI args (if -i option specified)
  if (argv.interactive) {
    argv = await promptArgs({ defaults: argv });
    cliArgLine = logArgs({ argv }); // Log for easier use next time
  }

  // Run the full test suite with the cli args
  try {
    isFullPass = await runSuite({
      parallel: argv.parallel,
      threads: argv.threads,
      browser: argv.browser,
      headed: argv.headed,
      resolutions: argv.resolutions,
      html: argv.html,
      xml: argv.xml,
      specs: argv.spec,
      ignoreSpecs: argv.ignoreSpec,
      retries: argv.retries,
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }

  // Log CLI argument call again at end of run
  if (cliArgLine) {
    console.log(cliArgLine);
  }

  // Exit with appropriate code (usefull for CI)
  const exitCode = isFullPass ? 0 : 1;
  console.log(`exiting with code ${exitCode}`);
  process.exit(exitCode);
}

(async () => main())();
