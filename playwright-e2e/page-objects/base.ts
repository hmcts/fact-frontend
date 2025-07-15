import {
  ExuiCaseDetailsComponent,
  ExuiCaseListComponent,
} from "@hmcts/playwright-common";
import { Page } from "@playwright/test";

// A base page inherited by pages & components
// can contain any additional config needed + instantiated page object
export abstract class Base {
  readonly exuiCaseListComponent = new ExuiCaseListComponent(this.page);
  readonly exuiCaseDetailsComponent = new ExuiCaseDetailsComponent(this.page);

  constructor(public readonly page: Page) {}
}
