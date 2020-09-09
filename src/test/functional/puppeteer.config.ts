import { config } from '../config';

export const puppeteerConfig = {
  headless: config.TestHeadlessBrowser,
  ignoreHTTPSErrors: true,
  'ignore-certificate-errors': true,
  args: [
    '--no-sandbox',
    '--proxy-server=proxyout.reform.hmcts.net:8080',
    '--proxy-bypass-list=*beta*LB.reform.hmcts.net',
    '--window-size=1440,1400',
  ],
};
