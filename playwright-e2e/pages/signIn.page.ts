import { type Locator, type Page } from '@playwright/test';

export default class SignIn {
  readonly heading: Locator;

  constructor(page: Page) {
    this.heading = page.getByRole('heading', { name: 'Sign in or create an account' });
    page.goto(
      'https://idam-web-public.aat.platform.hmcts.net/login?client_id=adoption-web&response_type=code&redirect_uri=https://adoption-web.aat.platform.hmcts.net/receiver'
    ); //replace this url with your log in url
  }
}
