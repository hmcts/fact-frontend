import { Page, Locator, expect } from '@playwright/test';
import { Base } from '../base';
import { ContinueButtonComponent } from '../components/continue-button.component';

export class SearchByNameOPage extends Base {
  readonly courtNameInput: Locator;
  readonly continueButton: ContinueButtonComponent;

  constructor(page: Page) {
    super(page);
    this.courtNameInput = this.page.locator('input[name="search"]');
    this.continueButton = new ContinueButtonComponent(page);
  }

  async enterCourtName(name: string) {
    await this.courtNameInput.fill(name);
  }

  async assertUrlIncludes(expected: string) {
    await expect(this.page).toHaveURL(new RegExp(expected));
  }
}
