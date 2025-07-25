import { Locator, Page, expect } from '@playwright/test';

export class ContinueButtonComponent {
  readonly button: Locator;

  constructor(private page: Page) {
    // Set locator once using stable selector
    this.button = page.locator('button.govuk-button:has-text("Continue")');
  }

  // Clicks the Continue button
  async click() {
    await this.button.click();
  }

  // Asserts the Continue button is visible
  async assertVisible() {
    await expect(this.button).toBeVisible();
  }
}
