import { Page } from 'playwright/test';
import { config, Config } from './config.utils';
import { CookiesUtils } from './cookies.utils';

export interface UtilsFixtures {
  config: Config;
  cookieUtils: CookiesUtils;
  lighthousePage: Page;
}
// eslint-disable-next-line no-empty-pattern
export const utilsFixtures = {
  config: async ({}, use) => {
    await use(config);
  },
  cookieUtils: async ({}, use) => {
    await use(new CookiesUtils());
  },
};
