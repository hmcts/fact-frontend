export const config = {
  TEST_URL: process.env.TEST_URL || 'http://localhost:3100',
  TestHeadlessBrowser: true,
  TestSlowMo: 300,
  WaitForTimeout: 10000,
  Gherkin: {
    features: './features-codecept-test/api-proxy.feature',
    steps: './codecept-steps-test/**/*.ts',
  },
  helpers: {}
};

config.helpers = {
  Playwright: {
    url: config.TEST_URL,
    show: !config.TestHeadlessBrowser,
    browser: 'chromium',
    windowSize: '1900x1200',
    waitForTimeout: config.WaitForTimeout,
    waitForAction: 1000,
    waitForNavigation: 'networkidle0',
    ignoreHTTPSErrors: true,
  },

  Puppeteer: {
    url: config.TEST_URL,
    show: !config.TestHeadlessBrowser,
    browser: 'chromium',
    waitForTimeout: config.WaitForTimeout,
    waitForAction: 1000,
    waitForNavigation: "networkidle0",
    ignoreHTTPSErrors: true,
  },

  REST: {
    endpoint:'',
    prettyPrintJson: true,
    onRequest: (request) => {
      request.headers.auth = '123';
    }
  },
  // .. add JSONResponse helper here
  JSONResponse: {}

};
