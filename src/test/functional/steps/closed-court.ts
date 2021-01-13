import {Given, Then, When} from 'cucumber';
import { expect } from 'chai';

import { config } from '../../config';
import * as I from '../utlis/puppeteer.util';

Given('I am on closed-court page', async function() {
  await I.newPage();
  await I.goTo(config.TEST_URL + '/courts/aberdare-county-court');
});

Then('I expect the closed-court page header to be {string}', async function(title: string) {
  const pageTitle = await I.getPageTitle();
  expect(pageTitle).equal(title);
});

When('I can select the link', async () => {
  const elementExist = await I.checkElement('#homeLink');
  expect(elementExist).equal(true);
  await I.click('#homeLink');
});

