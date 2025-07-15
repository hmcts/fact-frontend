import { expect, test } from "../fixtures";
import { cookiesHeader } from "../page-objects/components/cookies.header";

test.describe("Find a Court or Tribunal Landing Page", () => {
  test.beforeEach(async ({ page, config }) => {
    await page.goto(config.urls.testUrl);
    const cookies = new cookiesHeader(page.locator('.govuk-cookie-banner__message'), page);
    await cookies.acceptCookies();
  });

  test("Click Start Now button", async ({ factLandingPage }) => {
    await expect(factLandingPage.startNowButton).toBeVisible();
    await factLandingPage.startNowButton.click();
    await expect(factLandingPage.continueButton).toBeVisible();
  });
});

