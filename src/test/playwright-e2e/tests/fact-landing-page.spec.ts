import { expect, test } from "../fixtures";

test.describe("Find a Court or Tribunal Landing Page", () => {
  test.beforeEach(async ({ page, config, cookieUtils }) => {
    await page.goto(config.urls.testUrl);
    await cookieUtils.acceptCookies(page);
  });

  test("Click Start Now button", async ({ factLandingPage }) => {
    await expect(factLandingPage.startNowButton).toBeVisible();
    await factLandingPage.startNowButton.click();
    await expect(factLandingPage.continueButton).toBeVisible();
  });
});
