import { FactLandingOPage } from "./landing-page.po";

export interface PageFixtures {
  factLandingPage: FactLandingOPage;
}

/* Instantiates pages and provides page to the test via use()
 * can also contain steps before or after providing the page
 * this is the same behaviour as a beforeEach/afterEach hook
 */
export const pageFixtures = {
  factLandingPage: async ({ page }, use) => {
    const factLandingPage = new FactLandingOPage(page);
    await use(factLandingPage);
  },
};
