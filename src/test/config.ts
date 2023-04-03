export const config = {
  TEST_URL: process.env.TEST_URL || 'http://localhost:3100',
  TestHeadlessBrowser: true,
  TestSlowMo: 380,
  WaitForTimeout: 10000,
  Gherkin: {
    features: './features/*.feature',
    steps: './steps/**/*.ts',
  },
  helpers: {}
};

config.helpers = {
  Playwright: {
    url: config.TEST_URL,
    show: !config.TestHeadlessBrowser,
    browser: 'chromium',
    windowSize: '1300x800',
    waitForTimeout: config.WaitForTimeout,
    waitForAction: 1000,
    waitForNavigation: 'networkidle0',
    ignoreHTTPSErrors: true,
  }
};
