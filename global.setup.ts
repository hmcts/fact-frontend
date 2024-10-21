import { test as setup } from "@playwright/test";
import { IdamPage } from "./playwright-e2e/page-objects/pages/idam.po";
import { config } from "./playwright.config";

/*
 * Log in user the exui/solicitor user
 * if you have multiple different users, simply repeat the below
 * steps to save the session for that user
 *
 * If the user is logged out manually, it will invalidate the session data
 * Currently, the session is valid for 8 hours
 */
setup("Setup exui user", async ({ page }) => {
  await page.goto(config.urls.manageCaseBaseUrl);
  await new IdamPage(page).login(
    config.users.exui.username,
    config.users.exui.password
  );
});

setup("Setup citizen user", async ({ page }) => {
  await page.goto(config.urls.citizenUrl);
  await new IdamPage(page).login(
    config.users.citizen.username,
    config.users.citizen.password
  );
});
