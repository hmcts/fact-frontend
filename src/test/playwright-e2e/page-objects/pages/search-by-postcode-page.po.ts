import { Page, Locator } from '@playwright/test';
import { Base } from '../base';
import { ContinueButtonComponent } from '../components/continue-button.component';

export class SearchByPostcodeOPage extends Base {
  readonly postcodeInput: Locator;
  readonly continueButton: ContinueButtonComponent;

  constructor(page: Page) {
    super(page);
    this.postcodeInput = this.page.locator('#postcode');
    this.continueButton = new ContinueButtonComponent(page);
  }

  async enterPostcodeAndContinue(postcode: string) {
    const postcodePattern = /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i;
    if (!postcodePattern.test(postcode.trim())) {
      throw new Error(
        `Invalid UK postcode format: "${postcode}". Please use a valid postcode (e.g., SW1A 1AA).`
      );
    }
    await this.postcodeInput.fill(postcode);
    await this.continueButton.click();
  }
}
