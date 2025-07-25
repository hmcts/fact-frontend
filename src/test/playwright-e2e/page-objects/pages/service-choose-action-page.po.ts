import { Page, Locator } from '@playwright/test';
import { Base } from '../base';
import { ContinueButtonComponent } from '../components/continue-button.component';

export class ServiceChooseActionOPage extends Base {
  readonly nearestCourtOption: Locator;
  readonly sendDocumentsOption: Locator;
  readonly getUpdateOption: Locator;
  readonly notListedOption: Locator;
  readonly continueButton: ContinueButtonComponent;

  constructor(page: Page) {
    super(page);

    this.nearestCourtOption = this.page.locator('#nearest-court');
    this.sendDocumentsOption = this.page.locator('#document-court');
    this.getUpdateOption = this.page.locator('#update-court');
    this.notListedOption = this.page.locator('#not-listed');

    this.continueButton = new ContinueButtonComponent(this.page);
  }

  async selectNotListedAndContinue() {
    await this.notListedOption.check();
    await this.continueButton.click();
  }

  async selectSendDocumentsAndContinue() {
    await this.sendDocumentsOption.check();
    await this.continueButton.click();
  }

  async selectNearestCourtAndContinue() {
    await this.nearestCourtOption.check();
    await this.continueButton.click();
  }

  async selectGetUpdateAndContinue() {
    await this.getUpdateOption.check();
    await this.continueButton.click();
  }
}
