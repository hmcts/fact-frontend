import { Page } from '@playwright/test';
import { config, Config } from './config.utils';
import { CookiesUtils } from './cookies.utils';

export interface UtilsFixtures {
  config: Config;
  cookieUtils: CookiesUtils;
  lighthousePage: Page;
}
export const utilsFixtures = {
  // eslint-disable-next-line no-empty-pattern
  config: async ({}, use) => {
    await use(config);
  },
  // eslint-disable-next-line no-empty-pattern
  cookieUtils: async ({}, use) => {
    await use(new CookiesUtils());
  },
};
