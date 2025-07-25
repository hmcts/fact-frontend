import { Page, Locator } from '@playwright/test';
import { Base } from '../base';

export class ServiceNotFoundOPage extends Base {
  readonly searchByPrefixLink: Locator;
  readonly searchByPostCodeLink: Locator;
  readonly seeHowMuchYouPayLink: Locator;
  readonly findCourtFormsLink: Locator;

  constructor(page: Page) {
    super(page);
    this.searchByPrefixLink = this.page.getByRole('link', {
      name: 'Search for a court by prefix (A - Z)',
    });
    this.searchByPostCodeLink = this.page.getByRole('link', {
      name: 'Search for the nearest court or tribunal by postcode',
    });
    this.seeHowMuchYouPayLink = this.page.getByRole('link', {
      name: 'See how much you pay for your claim or case',
    });
    this.findCourtFormsLink = this.page.getByRole('link', {
      name: 'court and tribunal forms',
    });
  }

  async clickSearchByPrefix() {
    await this.searchByPrefixLink.click();
  }
  async clickSearchByPostCode() {
    await this.searchByPostCodeLink.click();
  }
  async clickSeeHowMuchYouPay() {
    await this.seeHowMuchYouPayLink.click();
  }
  async clickFindCourtForms() {
    await this.findCourtFormsLink.click();
  }
}
