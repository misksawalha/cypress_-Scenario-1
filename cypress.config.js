
const { defineConfig } = require("cypress");
const allureWriter = require("@shelex/cypress-allure-plugin/writer");


module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://opensource-demo.orangehrmlive.com',
    // baseUrl: 'https://conduit.productionready.io',
    // baseUrl: 'https://api.realworld.io',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
    setupNodeEvents(on, config) {
      require('@cypress/grep/src/plugin')(config);
      // implement node event listeners here
      allureWriter(on, config);
      return config;
    },
    execTimeout: 1200000,
    env: {
      snapshotOnly: true,
      allureReuseAfterSpec: true,
      download_dir: "./cypress/downloads",
    },
    allureResultsPath: "allure-results",
    allure:true,
    videosFolder: "allure-results/videos",
    screenshotOnRunFailure: true,
    allureAttachRequests:true,
    typing : 'cypress-file-upload',
  },
});
