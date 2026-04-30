const {defineConfig} = require("cypress");

module.exports = defineConfig({
    e2e: {
        viewportWidth: 1280,
        viewportHeight: 720,

        baseUrl: "https://dev.profteam.su",
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
    },
});