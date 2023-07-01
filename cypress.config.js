const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    reporter: "cypress-mochawesome-reporter",
    reporterOptions: {
      reportDir: "cypress/mochawesome-report",
      overwrite: false,
      html:true,
      json:true
    },
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require("cypress-mochawesome-reporter/plugin")(on)
      return config
    },
  },

  env: {
    disableGpu: false,
    browser: 'chrome',
    watchForFileChanges: true,
    video: false,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 10000
  }
});
