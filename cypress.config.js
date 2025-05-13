const { defineConfig } = require("cypress");
const envConfig = require("./cypress.env.json"); 

module.exports = defineConfig({
  projectId: 'fgd75c',
  watchForFileChanges: false,
  numTestsKeptInMemory: 0,
  viewportWidth: envConfig.sites.app.config.width,
  viewportHeight: envConfig.sites.app.config.height,
  experimentalMemoryManagement: true,
  experimentalWebKitSupport: true,
  video: false,
  defaultCommandTimeout: 60000,
  trashAssetsBeforeRuns: false,
  //experimentalModifyObstructiveThirdPartyCode: true,
  chromeWebSecurity: false,
  //noImplicitAny: false,
  //reporter code was added        
  //reporter: 'cypress-mochawesome-reporter',
  e2e: {
    setupNodeEvents(on, config) {
      //Added below code for HTML Report for executing selected scripts
      //require('cypress-mochawesome-reporter/plugin')(on);
      // require code was added
      return config;      
    },
  },
});
