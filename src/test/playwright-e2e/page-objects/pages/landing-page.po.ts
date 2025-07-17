import { Page, expect } from "@playwright/test";
import { Base } from "../base";

export class FactLandingOPage extends Base {
    //home landing page
    readonly startNowButton = this.page.locator('a.govuk-button.govuk-button--start:has-text("Start now")');

    //page option elements
    //'Do you know the name of the court or tribunal?'
    readonly continueButton = this.page.locator('button.govuk-button:has-text("Continue")');

    constructor(page: Page) {
    super(page);
  }
}
