import { config as testConfig } from '../../config';
import { expect } from 'chai';
import { I } from '../utlis/codecept-util';

export const iAmOnPage = (): void => {
  const url = new URL(testConfig.TEST_URL + '/courts/aberdare-county-court');
  if (!url.searchParams.has('lng')) {
    url.searchParams.set('lng', 'en');
  }
  I.amOnPage(url.toString());
};

Given('I am on FACT closed-court page', iAmOnPage);

Then('I expect the page header to be {string}', async function (title: string) {
  const pageTitle = await I.grabTitle();
  expect(pageTitle).equal(title);
});

When('I can select the link', async () => {
  I.clickLink('#homeLink');
});
