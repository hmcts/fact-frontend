// tests/searchByName.spec.ts
import { test, expect } from '../fixtures';

test.describe('sanity check for search by name @sanity', () => {
  test.beforeEach(async ({ page, config, cookieUtils }) => {
    await page.goto(config.urls.testUrl + '/search-by-name');
    await cookieUtils.acceptCookies(page);
  });
  test('can search by court name', async ({ searchByNamePage, page }) => {
    await searchByNamePage.enterCourtName('Manchester');
    await searchByNamePage.continueButton.click();

    await expect(page).toHaveURL(/courts\?search=Manchester/);

    const results = page.locator('#search-results h2.govuk-heading-m a');
    await expect(results).toHaveCount(9);
  });
});

test.describe('sanity check for money search options @sanity', () => {
  test.beforeEach(async ({ page, config, cookieUtils }) => {
    await page.goto(config.urls.testUrl + 'services/money/service-areas/nearest');
    await cookieUtils.acceptCookies(page);
  });

  test('can select money claims and continue', async ({ moneySearchPage, page }) => {
    await moneySearchPage.selectSingleJusticeProcedureAndContinue();
    await expect(page).toHaveURL(/minor-criminal-offences/);

    const sjpLink = page.locator('#search-result a.govuk-link');
    await expect(sjpLink).toHaveText('Single Justice Procedures Service Centre');
  });

  test('can select tax and continue', async ({ moneySearchPage, searchByPostcodePage, page }) => {
    await moneySearchPage.selectTaxAndContinue();
    await expect(page).toHaveURL(/tax/);

    await searchByPostcodePage.enterPostcodeAndContinue('N10 2LW');
  });
});
