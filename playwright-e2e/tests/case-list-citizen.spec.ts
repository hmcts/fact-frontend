import { expect, test } from "../fixtures";

test.describe("Case List Tests - Citizen @cui", () => {
  test.beforeEach(async ({ page, config }) => {
    await page.goto(config.urls.testUrl);
  });

  test("View cases", async ({ page}) => {
    page.pause();
    console.log("You are here!")
    console.log(process.env.TEST_URL);
  });
});

