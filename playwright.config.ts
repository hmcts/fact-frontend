import { defineConfig, devices } from "@playwright/test";

const DEFAULT_VIEWPORT = { width: 1920, height: 1080 };

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./playwright-e2e",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* This timeout should match whatever your longest test takes with slight leeway for app performance */
  timeout: 2 * 60 * 1000,
  /* The default timeout for assertions is 5s, it's not advised to increase this massively.
  If you need to, you can add a timeout to a specific assertion e.g. await page.goto('https://playwright.dev', { timeout: 30000 }); */
  expect: { timeout: 10000 },
  /* As we're using shared environments, it's not suggested to raise worker numbers above 4. */
  // TODO: Number for CI should be set to the jenkins param
  workers: process.env.CI ? 4 : 4,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: process.env.CI ? [["html"], ["list"]] : [["list"]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. - can also be applied per project */
  use: {
    // TODO: Set the below
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "retain-on-failure",
    video: "retain-on-failure",
    screenshot: "only-on-failure",
  },

  /* Configure projects for major browsers. See https://playwright.dev/docs/browsers */
  projects: [
    {
      name: 'setup db',
      testMatch: /global\.setup\.ts/,
    },
    {
      name: 'cleanup db',
      testMatch: /global\.teardown\.ts/,
    },
    {
      name: "chrome",
      use: {
        ...devices["Desktop Chrome"],
        channel: "chrome",
        viewport: DEFAULT_VIEWPORT,
      },
      dependencies: ['setup db'],
    },
    {
      name: "edge",
      use: {
        ...devices["Desktop Edge"],
        channel: "msedge",
        viewport: DEFAULT_VIEWPORT,
      },
      dependencies: ['setup db'],
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"], viewport: DEFAULT_VIEWPORT },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"], viewport: DEFAULT_VIEWPORT },
    },
    {
      name: "mobilechrome",
      use: { ...devices["Pixel 5"] },
    },
    {
      name: "mobilesafari",
      use: { ...devices["iPhone 12"] },
    },
  ],
});
