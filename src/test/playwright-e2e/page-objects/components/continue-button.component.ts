import { Locator, Page, expect } from '@playwright/test';

export class ContinueButtonComponent {
  readonly continueButton: Locator;

  constructor(page: Page) {
    // Set locator once using stable selector
    this.continueButton = page.locator('button.govuk-button:has-text("Continue")');
  }

  // Clicks the Continue button
  async click() {
    await this.continueButton.click();
  }

  // Asserts the Continue button is visible
  async assertVisible() {
    await expect(this.continueButton).toBeVisible();
  }
}
