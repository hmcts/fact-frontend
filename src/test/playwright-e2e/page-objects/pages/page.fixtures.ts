import { FactLandingOPage } from './landing-page.po';
import { Page } from '@playwright/test';
import { SearchOptionOPage } from './search-option-page.po';
import { ServiceChooseActionOPage } from './service-choose-action-page.po';
import { ReasonNeededOPage } from './reason-needed-page.po';
import { ServiceNotFoundOPage } from './service-not-found-page.po';
import { SearchByPrefixOPage } from './search-by-prefix-page.po';

export interface PageFixtures {
  factLandingPage: FactLandingOPage;
  searchOptionPage: SearchOptionOPage;
  serviceChooseActionPage: ServiceChooseActionOPage;
  reasonNeededPage: ReasonNeededOPage;
  serviceNotFoundPage: ServiceNotFoundOPage;
  searchByPrefixPage: SearchByPrefixOPage;
}

/* Instantiates pages and provides page to the test via use()
 * can also contain steps before or after providing the page
 * this is the same behaviour as a beforeEach/afterEach hook
 */

export const pageFixtures = {
  factLandingPage: async (
    { page }: { page: Page },
    use: (page: FactLandingOPage) => Promise<void>
  ) => {
    await use(new FactLandingOPage(page));
  },
  searchOptionPage: async (
    { page }: { page: Page },
    use: (page: SearchOptionOPage) => Promise<void>
  ) => {
    await use(new SearchOptionOPage(page));
  },
  serviceChooseActionPage: async (
    { page }: { page: Page },
    use: (page: ServiceChooseActionOPage) => Promise<void>
  ) => {
    await use(new ServiceChooseActionOPage(page));
  },
  reasonNeededPage: async (
    { page }: { page: Page },
    use: (page: ReasonNeededOPage) => Promise<void>
  ) => {
    await use(new ReasonNeededOPage(page));
  },
  serviceNotFoundPage: async (
    { page }: { page: Page },
    use: (page: ServiceNotFoundOPage) => Promise<void>
  ) => {
    await use(new ServiceNotFoundOPage(page));
  },
  searchByPrefixPage: async (
    { page }: { page: Page },
    use: (page: SearchByPrefixOPage) => Promise<void>
  ) => {
    await use(new SearchByPrefixOPage(page));
  },
};
