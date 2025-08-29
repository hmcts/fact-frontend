import { Page, Locator } from '@playwright/test';
import { Base } from '../base';
import { ContinueButtonComponent } from '../components/continue-button.component';

export class MoneySearchOPage extends Base {
  readonly moneyClaimsOption: Locator;
  readonly probateOption: Locator;
  readonly housingOption: Locator;
  readonly bankruptcyOption: Locator;
  readonly benefitsOption: Locator;
  readonly claimsAgainstEmployersOption: Locator;
  readonly taxOption: Locator;
  readonly singleJusticeProcedureOption: Locator;
  readonly cantFindOption: Locator;
  readonly continueButton: ContinueButtonComponent;

  constructor(page: Page) {
    super(page);
    this.moneyClaimsOption = this.page.locator('#money-claims');
    this.probateOption = this.page.locator('#probate');
    this.housingOption = this.page.locator('#housing');
    this.bankruptcyOption = this.page.locator('#bankruptcy');
    this.benefitsOption = this.page.locator('#benefits');
    this.claimsAgainstEmployersOption = this.page.locator('#claims-against-employers');
    this.taxOption = this.page.locator('#tax');
    this.singleJusticeProcedureOption = this.page.locator('#minor-criminal-offences');
    this.cantFindOption = this.page.locator('#not-listed');
    this.continueButton = new ContinueButtonComponent(this.page);
  }

  async selectMoneyClaimsAndContinue() {
    await this.moneyClaimsOption.check();
    await this.continueButton.click();
  }
  async selectProbateAndContinue() {
    await this.probateOption.check();
    await this.continueButton.click();
  }
  async selectHousingAndContinue() {
    await this.housingOption.check();
    await this.continueButton.click();
  }
  async selectBankruptcyAndContinue() {
    await this.bankruptcyOption.check();
    await this.continueButton.click();
  }
  async selectBenefitsAndContinue() {
    await this.benefitsOption.check();
    await this.continueButton.click();
  }
  async selectClaimsAgainstEmployersAndContinue() {
    await this.claimsAgainstEmployersOption.check();
    await this.continueButton.click();
  }
  async selectTaxAndContinue() {
    await this.taxOption.check();
    await this.continueButton.click();
  }
  async selectSingleJusticeProcedureAndContinue() {
    await this.singleJusticeProcedureOption.check();
    await this.continueButton.click();
  }
  async selectCantFindAndContinue() {
    await this.cantFindOption.check();
    await this.continueButton.click();
  }
}
