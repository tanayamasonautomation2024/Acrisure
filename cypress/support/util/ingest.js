const xlsx = require("node-xlsx");
const dataMap = require("../../fixtures/app/data-map.json");
const fs = require("fs");
const path = require("path");

const ENV = require("../../../cypress.env.json");

/**
 * Map a header value to a JSON key. Example: "Some Name %" -> someNamePercent
 * The values come from headerMap.json under fixtures
 *
 * @param {Object} obj
 * @param {string} obj.header The header from the input data
 * @returns
 */
function mapHeader({ header }) {
  header = String(header).trim();
  if (header in dataMap.keys) {
    return dataMap.keys[header];
  } else {
    // If the header is not in the defined mapping, return it as snake case
    const toSnakeCase = (str) =>
      str &&
      str
        .match(
          /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
        )
        .map((x) => x.toLowerCase())
        .join("_");

    return toSnakeCase(header);
  }
}

/**
 * Format a value depending on the object type. Currently used to parse dates
 * to the desired format.
 * @param {*} value
 * @returns
 */
function formatValue(value) {
  try {
    // Check if the value is a Date object
    if (value.constructor.name == "Date") {
      // Format the date as M/D/YYYY
      const d = new Date(value);
      return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
    }
  } catch (e) {
    // An issue parsing the object occured
  }

  // Undefined values should be empty string
  if (value === undefined) {
    return "";
  }

  // Use string representation for all other values
  return String(value);
}

/**
 * Covert a single xlsx tab/sheet to a JSON object
 *
 * @param {Object} obj
 * @param {string} obj.tabData The raw tab data
 * @returns A json object of all rows in the tab
 */
function xlsxTabToJson({ tabData, skipPartial = true, skipThreshold = 3 }) {
  // Get the headers from the first row
  const headers = tabData[0];

  // Create an array to hold all rows
  const jsonData = [];

  // For each row (after the header)
  for (let i = 1; i < tabData.length; i++) {
    const row = tabData[i];
    const rowLength = tabData[0].length;

    if (skipPartial && row.length <= skipThreshold) {
      console.log(`Skipping partial row #${i + 1}`);
      continue;
    }

    if (row.length == 0) {
      console.log(`Skipping empty row #${i + 1}`);
      continue;
    }

    // Create an object for each row (i - 1 because header row is not counted)
    jsonData[i - 1] = {};

    // Each column in the sheet
    for (let j = 0; j < rowLength; j++) {
      // Get the header for the current column (default to column number if no header)
      const header = headers[j] ?? `column${j + 1}`;

      // Map the header to the desired JSON field
      const dataKey = mapHeader({ header });
      const dataValue = row[j];

      // Format the data value based on it's type
      const dataValueFormatted = formatValue(dataValue);

      // Write the data value with the desired JSON key. Example:  name: "Some name"
      jsonData[i - 1][dataKey] = dataValueFormatted;
    }
  }

  return jsonData;
}

/**
 * Get a single tab from an xlsx data object
 *
 * @param {Object} obj
 * @param {string} obj.tabName The name of the tab/sheet
 * @param {string} obj.xlsxObj The xlsx data object
 * @returns JSON data using the header of the tab and all subsequent rows as data values
 */
function getTabJson({ tabName = "Sheet 1", xlsxObj }) {
  for (const tab of xlsxObj) {
    if (tab.name == tabName) {
      const tabJson = xlsxTabToJson({ tabData: tab.data, skipPartial: false });
      return tabJson;
    }
  }
}

/**
 * Load an input xlsx (excel) file, and return the data as a json object
 *
 * @param {Object} obj
 * @param {string} obj.inputFile Load an input xlsx file
 * @returns JSON object of the xslx file, with all sheets as keys
 */
function loadXlsx({ inputFilePath }) {
  const xlsxObj = xlsx.parse(inputFilePath, { cellDates: true });
  return xlsxObj;
}

/**
 * Write a json object to a fixture file for a site
 *
 * @param {Object} obj
 * @param {string} obj.json json data to write to fixture file
 * @param {string} obj.file filename to save to
 */
function writeFixtureJson({ json, filename }) {
  // Convert the json to a string (with new line at end)
  const jsonString = `${JSON.stringify(json, null, 2)}\n`;

  // Get the filename relative to the cypress fixtures path, and save the json data
  const filePath = path.join("cypress", "fixtures", "app", filename);
  fs.writeFileSync(filePath, jsonString);
  console.log(`JSON Fixture saved: ./${filePath}`);
}

/**
 * Converts the merged JSON data to the expected format
 *
 * @param {Object} mergedJson
 */
function getFinalizedJson(mergedJson) {
  let finalJson = { testData: [] };

  for (const idx in Object.keys(mergedJson.step1)) {
    finalJson.testData[idx] = {};
    finalJson.testData[idx].product_data = {};

    for (const product of Object.keys(mergedJson)) {
      if (product == "step1") {
        finalJson.testData[idx]["client"] = mergedJson["step1"][idx];
        finalJson.testData[idx]["client"].products = [];
      } else if (product == "census") {
        finalJson.testData[idx]["census"] = mergedJson["census"][idx];
      } else {
        const productInfo = mergedJson[product][idx];

        if (productInfo != undefined) {
          finalJson.testData[idx].product_data[product] = productInfo;
          finalJson.testData[idx]["client"].products.push(product);
        }
      }
    }
  }

  return finalJson;
}

/**
 * Ingests data for App (testObj RFP format)
 *
 * @param {Object} obj
 * @param {string} obj.inputFile Object containing input file and tabs to convert
 */
function ingestAppData({ inputFile }) {
  const inputFilePath = `${__dirname}/../../../data/${inputFile.source}`;
  if (!fs.existsSync(inputFilePath)) {
    // Show error message if the input file does not exist
    const errorMessage = `Input file "${inputFilePath}" not found, please make sure it exists.`;
    console.log(errorMessage);
    process.exit();
  }

  // Load and parse the input file
  const xlsxObj = loadXlsx({ inputFilePath });

  // Process each tab
  const tabs = inputFile.tabs;
  let mergedJson = {};
  for (const tab in tabs) {
    const jsonFilename = tabs[tab];

    // Show debug message if a tab is not found
    const tabJson = getTabJson({ tabName: tab, xlsxObj });
    if (tabJson == undefined) {
      console.log(`Tab "${tab}" not found in ${inputFile}`);
      continue;
    }

    console.log(`Processing tab: ${tab}`);

    mergedJson[jsonFilename.replace(".json", "")] = tabJson;
  }

  // Re-organize the mergedJson to match the expected format
  const finalJson = getFinalizedJson(mergedJson);

  // Write a fixture .json file for the "CA" tab data
  writeFixtureJson({
    json: finalJson,
    filename: `${inputFile.source.replace(".xlsx", "")}.json`,
  });
}

/**
 * Ingests data for App (legacy flat json)
 *
 * @param {Object} obj
 * @param {string} obj.inputFile Object containing input file and tabs to convert
 */
function ingestAppDataLegacy({ inputFile }) {
  const inputFilePath = `${__dirname}/../../../data/${inputFile.source}`;
  if (!fs.existsSync(inputFilePath)) {
    // Show error message if the input file does not exist
    const errorMessage = `Input file "${inputFilePath}" not found, please make sure it exists.`;
    console.log(errorMessage);
    process.exit();
  }

  // Load and parse the input file
  const xlsxObj = loadXlsx({ inputFilePath });

  // Process each tab
  const tabs = inputFile.tabs;
  for (const tab in tabs) {
    const jsonFilename = tabs[tab];

    // Show debug message if a tab is not found
    const tabJson = getTabJson({ tabName: tab, xlsxObj });
    if (tabJson == undefined) {
      console.log(`Tab "${tab}" not found in ${inputFile}`);
      continue;
    }

    console.log(`Processing tab: ${tab}`);

    // Write a fixture .json file for the "CA" tab data
    writeFixtureJson({
      json: { testData: tabJson },
      filename: jsonFilename,
    });
  }
}

/**
 * Main script entrypoint
 */
function main() {
  // input files should be placed under <project root>/data/App/something.xlsx
  const inputFiles = ENV.sites.app.test_data;
  for (const inputFile of inputFiles) {
    try {
      ingestAppData({ inputFile });
    } catch {
      ingestAppDataLegacy({ inputFile });
    }
  }
}

main();
