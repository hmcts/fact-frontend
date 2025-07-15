import { AxeUtils } from "@hmcts/playwright-common";
import { Page } from "playwright/test";
import { config, Config } from "./config.utils";
import { CookiesUtils } from "./cookies.utils";

export interface UtilsFixtures {
  config: Config;
  cookieUtils: CookiesUtils;
  axeUtils: AxeUtils;
  lighthousePage: Page;
}

export const utilsFixtures = {
  config: async ({}, use) => {
    await use(config);
  },
  cookieUtils: async ({}, use) => {
    await use(new CookiesUtils());
  },
  axeUtils: async ({ page }, use) => {
    await use(new AxeUtils(page));
  },
};
