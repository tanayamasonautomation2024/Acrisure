// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";
import addContext from "mochawesome/addContext";
//import 'cypress-mochawesome was added'
//import 'cypress-mochawesome-reporter/register';

// Alternatively you can use CommonJS syntax:
// require('./commands')

require("@cypress/xpath");


const titleToFileName = (title) => title.replace(/[:\/]/g, "");
Cypress.on("test:after:run", (test, runnable) => {
  // Add screenshots for only failed tests
  if (test.state === "failed") {
    let parent = runnable.parent;
    let filename = "";
    while (parent && parent.title) {
      filename = `${titleToFileName(parent.title)} -- ${filename}`;
      parent = parent.parent;
    }
    filename += `${titleToFileName(test.title)} (failed).png`;
    addContext({ test }, `../screenshots/${Cypress.spec.name}/${filename}`);
  }

  // Add videos to all tests (if video is set in config)
  if (Cypress.config("video")) {
    addContext({ test }, `../videos/${Cypress.spec.name}.mp4`);
  }
});

Cypress.on("uncaught:exception", (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  return false;
});

// Hide fetch/XHR requests from command log
if (Cypress.env("hideXHRInCommandLog")) {
  const app = window.top;

  if (
    app &&
    !app.document.head.querySelector("[data-hide-command-log-request]")
  ) {
    const style = app.document.createElement("style");
    style.innerHTML =
      ".command-name-request, .command-name-xhr { display: none }";
    style.setAttribute("data-hide-command-log-request", "");

    app.document.head.appendChild(style);
  }
}
