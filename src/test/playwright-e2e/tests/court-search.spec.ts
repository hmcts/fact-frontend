import { test } from '../fixtures';

//
// USER JOURNEY Tests: Full Journey frome homepage to search by prefix page
//
test.describe('A to Z Court Search Journey @functional', () => {
  test.beforeEach(async ({ page, config, cookieUtils, factLandingPage }) => {
    await page.goto(config.urls.testUrl);
    await cookieUtils.acceptCookies(page);
    await factLandingPage.startNowButton.click();
  });

  test('Complete journey from homepage to A-Z search page', async ({
    searchOptionPage,
    serviceChooseActionPage,
    reasonNeededPage,
    serviceNotFoundPage,
  }) => {
    await searchOptionPage.selectIDoNotHaveTheName();
    await serviceChooseActionPage.selectNotListedAndContinue();
    await reasonNeededPage.selectCantFindAndContinue();
    await serviceNotFoundPage.clickSearchByPrefix();
  });
});

//
// SEARCH RESULTS TESTS: Focused tests for A-Z prefirx search outcomes
//
test.describe('Search by prefix results @functional', () => {
  test.beforeEach(async ({ page, config, cookieUtils }) => {
    await page.goto(config.urls.testUrl + '/services/search-by-prefix');
    await cookieUtils.acceptCookies(page);
  });

  test('Displays message when no courts match selected prefix (e.g. X)', async ({
    searchByPrefixPage,
  }) => {
    await searchByPrefixPage.clickLetter('X');
    await searchByPrefixPage.assertUrlIncludes('X');
    await searchByPrefixPage.assertNoResultsVisible('X');
  });

  test('Displays court list where all names begin with selected prefix (e.g. B)', async ({
    searchByPrefixPage,
  }) => {
    await searchByPrefixPage.clickLetter('B');
    await searchByPrefixPage.assertUrlIncludes('B');
    await searchByPrefixPage.assertCourtsStartWith('B');
  });
});
