const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    reporter: "cypress-mochawesome-reporter",
    reporterOptions: {
      reportDir: "cypress/mochawesome-report",
      reportFilename: '[status]_[dateto,e]_report.html',
      overwrite: false,
      html:true,
      json:true
    },
    testIsolation: false,
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require("cypress-mochawesome-reporter/plugin")(on)
      return config
    },


  },

  env: {
    
    apiToken: "663c25da3b6be5dbafc11858c93e3b45a275f34b",
    baseUrl: "https://todoist.com/",
    baseUrlApi: "https://api.todoist.com/rest/v2/",
  },
  disableGpu: false,
  browser: 'chrome',
  watchForFileChanges: true,
  video: false,
  screenshotOnRunFailure: true,
  defaultCommandTimeout: 30000,
  pageLoadTimeout: 40000,

});
