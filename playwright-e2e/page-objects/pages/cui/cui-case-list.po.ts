import { Page } from "@playwright/test";
import { config } from "../../../../playwright.config";
import { Base } from "../../base";
import { cuiCaseListComponent } from "../../components/";

export class CuiCaseListPage extends Base {
  readonly container = this.page.getByRole("main");
  readonly banner = this.page.getByRole("banner");
  readonly cuiCaseListComponent = new cuiCaseListComponent(
    this.page,
    this.container
  );

  constructor(page: Page) {
    super(page);
  }

  async goto() {
    await this.page.goto(config.urls.citizenUrl);
  }
}
