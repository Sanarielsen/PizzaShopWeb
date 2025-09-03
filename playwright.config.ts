import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './test',
  testMatch: /.*\.(e2e-spec|spec|test)\.ts$/, //testMatch: /.*\.e2e-spec\.ts$/,
  fullyParallel: true, //When you need execute more than one test in same time
  forbidOnly: !!process.env.CI, //When you want to execute one test and it rebuild the map of which test you want to execute. Can be possible ignore error from ohter test
  retries: process.env.CI ? 2 : 0, //Times the test can be rexecuted when have a fail
  workers: process.env.CI ? 1 : undefined, //How much tests you want to execute
  reporter: 'html', //Which format you want to have to show the results
  use: {
    baseURL: 'http://localhost:50789/',
    //trace: 'on-first-retry', //Trace is something when you want more details of result tests
  },
  webServer: {
    command: 'pnpm dev:test',
    url: 'http://localhost:50789/',
    reuseExistingServer: !process.env.CI, //When you want to use the same server used to before, less in production or staging (CI)
  }

  // projects: [
  //   {
  //     name: 'chromium',
  //     use: { ...devices['Desktop Chrome'] },
  //   },

  //   {
  //     name: 'firefox',
  //     use: { ...devices['Desktop Firefox'] },
  //   },

  //   {
  //     name: 'webkit',
  //     use: { ...devices['Desktop Safari'] },
  //   },


  //   // {
  //   //   name: 'Mobile Chrome',
  //   //   use: { ...devices['Pixel 5'] },
  //   // },
  //   // {
  //   //   name: 'Mobile Safari',
  //   //   use: { ...devices['iPhone 12'] },
  //   // },


  //   // {
  //   //   name: 'Microsoft Edge',
  //   //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
  //   // },
  //   // {
  //   //   name: 'Google Chrome',
  //   //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
  //   // },
  // ],
});
