import { test as setup } from "./fixtures";

/**
 * Sets up test sessions for all required user roles and stores session data.
 * 
 * This setup script can be reused for each user type individually.
 * Note: Manually signing out during tests will invalidate the stored session.
 * For EXUI users, sessions are currently valid for 8 hours.
 */
setup.describe("Set up users and retrieve tokens", () => {

  /**
   * Retrieves an IDAM bearer token at the beginning of the test run.
   * 
   * This token is used to authorise user creation and is stored as an 
   * environment variable (`CREATE_USER_BEARER_TOKEN`) for reuse across the test suite.
   */
  setup.beforeAll("Retrieve IDAM token for user creation", async ({ idamUtils }) => {
    const token = await idamUtils.generateIdamToken(
      "client_credentials",
      "prl-cos-api",
      process.env.IDAM_SECRET as string, //make sure your client seceret is being pulled from azure key vault
      "profile roles"
    );
    process.env.CREATE_USER_BEARER_TOKEN = token;
  });

  /**
   * Signs in as a citizen user and sets the required cookies.
   */
  setup("Set up citizen user", async ({ page, config, idamPage, cookieUtils }) => {
    await page.goto(config.urls.citizenUrl);
    await idamPage.login(config.users.citizen);
    await cookieUtils.addAnalyticsCookie(config.users.citizen);
  });

  /**
   * Signs in as a case manager and stores session data.
   * Skips login if a valid session already exists.
   */
  setup("Set up case manager user", async ({ page, config, idamPage, SessionUtils, cookieUtils }) => {
    const user = config.users.caseManager;
    if (SessionUtils.isSessionValid(user.sessionFile, user.cookieName!)) return;
    await page.goto(config.urls.manageCaseBaseUrl);
    await idamPage.login(user);
    await cookieUtils.addAnalyticsCookie(user);
  });

  /**
   * Signs in as a judge and stores session data.
   * Skips login if a valid session already exists.
   */
  setup("Set up judge user", async ({ page, config, idamPage, SessionUtils, cookieUtils }) => {
    const user = config.users.judge;
    if (SessionUtils.isSessionValid(user.sessionFile, user.cookieName!)) return;
    await page.goto(config.urls.manageCaseBaseUrl); // Assuming this is correct
    await idamPage.login(user);
    await cookieUtils.addAnalyticsCookie(user);
  });
});
