import { Page } from '@playwright/test';
import { Base } from '../base';
import { ContinueButtonComponent } from '../components/continue-button.component';

export class FactLandingOPage extends Base {
  //home landing page
  readonly startNowButton = this.page.locator(
    'a.govuk-button.govuk-button--start:has-text("Start now")'
  );

  //page option elements
  //'Do you know the name of the court or tribunal?'
  readonly continueButton = new ContinueButtonComponent(this.page);

  constructor(page: Page) {
    super(page);
  }
}
