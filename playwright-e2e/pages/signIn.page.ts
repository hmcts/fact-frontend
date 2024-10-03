import { Page } from "@playwright/test";
import BasePage from "./base.page";

export class SignIn extends BasePage {
  readonly heading = this.page.getByRole("heading", {
    name: "Sign in or create an account",
  });

  constructor(page: Page) {
    super(page);
  }

  async goto() {
    await this.open(
      "https://idam-web-public.aat.platform.hmcts.net/login?client_id=adoption-web&response_type=code&redirect_uri=https://adoption-web.aat.platform.hmcts.net/receiver"
    ); //replace this url with your log in url
  }
}
