import { Locator, Page } from '@playwright/test';
import { expect } from '../../fixtures';

export class cookiesHeader {
  readonly acceptCookiesButton = this.root.locator('button.cookie-banner-accept-button', {
    hasText: 'Accept additional cookies',
  });
  readonly hideMessageButton = this.root.getByRole('button', {
    name: 'Hide this message',
  });

  constructor(private root: Locator, private page: Page) {}

  async acceptCookies() {
    if (await this.acceptCookiesButton.isVisible()) {
      await this.acceptCookiesButton.click();
      await expect(this.hideMessageButton).toBeVisible();
      await this.hideMessageButton.click();
    }
  }
}
