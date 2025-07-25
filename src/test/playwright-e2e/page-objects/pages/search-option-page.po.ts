import { Page, Locator } from '@playwright/test';
import { Base } from '../base';
import { ContinueButtonComponent } from '../components/continue-button.component';

export class SearchOptionOPage extends Base {
  readonly iHaveTheNameOption: Locator;
  readonly iDoNotHaveTheNameOption: Locator;
  readonly continueButton: ContinueButtonComponent;

  constructor(page: Page) {
    super(page);
    this.iHaveTheNameOption = this.page.locator('#i-have-the-name');
    this.iDoNotHaveTheNameOption = this.page.locator('#i-do-not-have-the-name');
    this.continueButton = new ContinueButtonComponent(this.page);
  }

  async selectIHaveTheName() {
    await this.iHaveTheNameOption.check();
    await this.continueButton.click();
  }

  async selectIDoNotHaveTheName() {
    await this.iDoNotHaveTheNameOption.check();
    await this.continueButton.click();
  }
}
