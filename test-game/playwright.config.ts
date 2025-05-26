// playwright.config.js
// Plain JavaScript version with no TypeScript

/**
 * @type {import('@playwright/test').PlaywrightTestConfig}
 */

const { defineConfig } = require('@playwright/test');
module.exports = defineConfig  ({
  testDir: 'src/tests',
  timeout: 30000,
  expect: {
    timeout: 5000
  },
  // Run against your Vite dev server
  webServer: {
    command: 'npm run dev',
    port: 5173, // Default Vite port
    reuseExistingServer: !process.env.CI,
  },
  use: {
    baseURL: 'http://localhost:5173',
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
  },
  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
      },
    },
  ],
});

//module.exports = config;