import { Page, Locator } from '@playwright/test';
import { Base } from '../base';
import { ContinueButtonComponent } from '../components/continue-button.component';

export class FactLandingOPage extends Base {
  // Page elements
  readonly startNowButton: Locator;
  readonly continueButton: ContinueButtonComponent;
  readonly welshLink: Locator;

  constructor(page: Page) {
    super(page);

    this.startNowButton = this.page.locator(
      'a.govuk-button.govuk-button--start:has-text("Start now")'
    );
    this.continueButton = new ContinueButtonComponent(page);
    this.welshLink = this.page.locator('a.govuk-link[href="/?lng=cy"]');
  }

  // Optionally add reusable method if there's a journey:
  async clickStartNow() {
    await this.startNowButton.click();
  }

  async clickWelshLink() {
    await this.welshLink.click();
  }
}
