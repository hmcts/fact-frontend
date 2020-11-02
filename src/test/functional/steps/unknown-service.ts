import { Given, Then } from 'cucumber';
import { expect } from 'chai';

import { config } from '../../config';
import * as I from '../utlis/puppeteer.util';

Given('I am on unknown-service page', async function() {
  await I.newPage();
  await I.goTo(config.TEST_URL + '/services/unknown-service');
});

Then('I expect the unknown-service page header to be {string}', async function(title: string) {
  const pageTitle = await I.getPageTitle();
  expect(pageTitle).equal(title);
});
