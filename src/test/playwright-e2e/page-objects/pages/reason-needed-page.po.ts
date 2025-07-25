import { Page, Locator } from '@playwright/test';
import { Base } from '../base';
import { ContinueButtonComponent } from '../components/continue-button.component';

export class ReasonNeededOPage extends Base {
  readonly moneyOption: Locator;
  readonly probateOption: Locator;
  readonly childcareOption: Locator;
  readonly harmOption: Locator;
  readonly immigrationOption: Locator;
  readonly crimeOption: Locator;
  readonly highCourtOption: Locator;
  readonly cantFindOption: Locator;

  readonly continueButton: ContinueButtonComponent;

  constructor(page: Page) {
    super(page);

    this.moneyOption = this.page.locator('#money');
    this.probateOption = this.page.locator('#probate-divorce-or-ending-civil-partnerships');
    this.childcareOption = this.page.locator('#childcare-and-parenting');
    this.harmOption = this.page.locator('#harm-and-abuse');
    this.immigrationOption = this.page.locator('#immigration-and-asylum');
    this.crimeOption = this.page.locator('#crime');
    this.highCourtOption = this.page.locator('#high-court-district-registries');
    this.cantFindOption = this.page.locator('#not-listed');

    this.continueButton = new ContinueButtonComponent(page);
  }

  async selectMoneyAndContinue() {
    await this.moneyOption.check();
    await this.continueButton.click();
  }

  async selectProbateAndContinue() {
    await this.probateOption.check();
    await this.continueButton.click();
  }

  async selectChildcareAndContinue() {
    await this.childcareOption.check();
    await this.continueButton.click();
  }

  async selectHarmAndContinue() {
    await this.harmOption.check();
    await this.continueButton.click();
  }

  async selectImmigrationAndContinue() {
    await this.immigrationOption.check();
    await this.continueButton.click();
  }

  async selectCrimeAndContinue() {
    await this.crimeOption.check();
    await this.continueButton.click();
  }

  async selectHighCourtAndContinue() {
    await this.highCourtOption.check();
    await this.continueButton.click();
  }

  async selectCantFindAndContinue() {
    await this.cantFindOption.check();
    await this.continueButton.click();
  }
}
