export const config = {
  TEST_URL: process.env.TEST_URL || 'http://localhost:3100',
  TestHeadlessBrowser: false,
  TestSlowMo: 180,
  WaitForTimeout: 10000,
  Gherkin: {
    features: './features-codecept-test/**/childcare-and-parenting-service-area.feature',
    steps: './codecept-steps-test/**/*.ts',
  },
  helpers: {}
};

config.helpers = {
  Playwright: {
    url: config.TEST_URL,
    show: !config.TestHeadlessBrowser,
    browser: 'chromium',
    waitForTimeout: config.WaitForTimeout,
    waitForAction: 1000,
    waitForNavigation: 'networkidle0',
    ignoreHTTPSErrors: true,
  },
};
