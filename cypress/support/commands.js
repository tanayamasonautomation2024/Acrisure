// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
const selectors = require("../fixtures/app/selectors.json");

Cypress.Commands.add(
  "visitSite",
  (site, page = "", options = { skipOnetrust: false, skipLogin: false }) => {
    // Get the configuration node for the site
    const siteConfig = Cypress.env("sites")[site];

    // Get the configured environment and its base url
    const env = siteConfig.config.env;
    const envConfig = siteConfig.envs[env];
    const appUrl = envConfig["app_url"];

    // Visit the correct environment url and requested page
    cy.visit(`${appUrl}/${page}`, { failOnStatusCode: false });

    if (options.skipOnetrust == false) {
      // Dismiss cookie dialog if it exists
      cy.waitForElem({
        selector: selectors.login.onetrust,
        callback: () => {
          cy.wait(3000);
          cy.get(selectors.login.onetrust).click();
        },
        timeout: 12000,
      });
    }

    if (options.skipLogin == false) {
      // Check if this environment is password protected
      const hasCreds = "user" in envConfig && "pass" in envConfig;

      // Enter creds if needed
      if (hasCreds) {
        cy.waitForElem({
          selector: selectors.login.submit,
          callback: () => {
            const opt = {}; // const opt = { force: true };
            cy.get(selectors.login.username).type(envConfig.user, opt);
            cy.get(selectors.login.password).type(envConfig.pass, opt);
            cy.get(selectors.login.submit).click(opt);
          },
          timeout: 12000,
        });
      }
    }
  }
);

Cypress.Commands.add(
  "waitForElem",
  ({
    selector,
    callback,
    timeout = Cypress.config("defaultCommandTimeout"),
  }) => {
    function _waitForElem(selector, callback, attempt = 0) {
      const interval = 100;
      if (attempt * interval > timeout) {
        cy.log(selector, "not found");
        return cy.wrap(false);
      }

      return cy.get("body", { log: false }).then(($body) => {
        const element = $body.find(selector);
        if (element.length) {
          cy.log(selector, "found");
          callback();
          return cy.wrap(true);
        } else {
          cy.wait(interval, { log: false });
          return _waitForElem(selector, callback, ++attempt);
        }
      });
    }

    cy.log("waitForElem", selector, timeout);
    _waitForElem(selector, callback);
  }
);
