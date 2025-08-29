import { Locator, Page, expect } from '@playwright/test';

export class BackLinkComponent {
  readonly backLink: Locator;

  constructor(page: Page) {
    this.backLink = page.locator('a.govuk-back-link');
  }

  async click() {
    await this.backLink.click();
  }

  async assertVisible() {
    await expect(this.backLink).toBeVisible();
  }

  //   async assertText(expected = 'Back') {
  //     await expect(this.backLink).toHaveText(expected);
  //   }
}
