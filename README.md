# acrisure-nextjs-ultranauts

## Installation

Clone the repository and checkout the `main` branch

```
git clone git@github.com:acrisuretechnology/acrisure-nextjs-ultranauts.git
cd acrisure-nextjs-ultranauts.git
git checkout main
```

Install node dependencies

```
npm install -D
```

Initialize the environment configuration

```
cp cypress.env.json.example cypress.env.json
```

> _**Note:** `cypress.env.json` should be used for custom environment variables, whereas `cypress.config.js` should contain cypress configuration options as well as code items that need to be placed in `setupNodeEvents()` for cypress events._

Then you should be able to run the tests:

```
npm test
```

## CLI Tool

Cypress tests can be run directly (via `npx cypress run` etc...) or with the custom CLI tool (`cli.js`). This tool allows easy specification of commonly used test run parameters. The command can be invoked via running `node cli.js`, and the full set of customizable options can be displayed by running the `node cli.js --help` command.

If the command is run without any options, it will automatically be run in `--interactive` mode which will interactively prompt the user for configuration options. This is an easy way to discover the full features of the tool. For convenience when run interactively, the full non-interactive CLI command is printed to the console.

### Common `cypress.env.json` Settings

Under `sites.app.config`,  project settings can be quickly configured to run the cypress scripts based on the controlled parameters:

 - `env` - Set the testing environment to run the app against (e.g. beta, dev, prod, etc.).
	 - Default value is **`beta`**
 - `width` - Set the resolution width for the cypress script to run
	 - Default value is **`1920`**
 - `height` - Set the resolution height for the cypress script to run
	 - Default value is **`1080`**

Under `sites.app.envs`, each environment must be configured with the following settings:
 - `app_url` - Set the testing url for the environment registered for the assigned environment.
 - `user` - Set the username to log into the test environment when prompted by the script
 - `pass` - Set the password to log into the test environment when prompted by the script

> _**Note:** password requirements are subject to change later into development._

### Whitelisting for Cloudflare

Automation on the website can be blocked as Cloudflare's bot detection will trigger during test runs. Please reach out to the Acrisure Dev team to whitelist the public IPv4 address that the machine being used to run the tests is accessing.

* **IPv6 addresses must be disabled on the network** - Cloudflare will block machines that use the dynamically changing IPv6 addresses even if the IPv4 address is whitelisted.
* Windows Users may use [this link to follow step by step instructions to disable IPv6 addresses](https://www.majorgeeks.com/content/page/how_to_enable_or_disable_ipv6_in_windows.html)

## Running Specific Tests and Test Groups

To run all tests:

```
npm run all
```

To run only smoke tests:

```
npm run smoke
```

To run only regression tests:

```
npm run regression
```

> _**Note:** `smoke`, `regression`, and `all` have `:headed` variants that will run the browser in headed mode. For example: `npm run smoke:headed`_

## Parallel Runs

To run all tests in parallel, run the command:

```
npm run all:parallel
```

Results will be saved in `cypress/results`, and a full report of all results will be saved to `full-report.html` which will be opened automatically when the run has completed.

The results will contain screenshots for failed tests, and videos for all tests, if `video` is set to `true` in `cypress.config.js`, otherwise no videos will be included.

The number of threads is defined in the `-t` argument in the `cypress-parallel` call, which can be changed depending on your system.

To manually merge generate the report run:

```
npm run report:merge
npm run report:generate
```

## Code Formatting

Code should be formatted with `prettier`, to ensure a consistent code style and avoid unnecesary merge issues.

To set up git hooks so that code is formatted before commits, run the followign command once after cloning the repository:

```
npm prepare
```

Note: If you ever want to bypass the git hooks, you can pass `--no-verify` to git, for example:

```
git commit -m 'some commit message' --no-verify
```

Then, to check the working directory for formatting issues, run:

```
npm run code-format-check
```

To re-format all files, run:

```
npm run code-format-write
```
