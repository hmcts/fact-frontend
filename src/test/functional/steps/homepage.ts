import { Given, Then } from 'cucumber';
import { expect } from 'chai';

import { config } from '../../config';
const scope = require('../support/scope');

Given('I am on FACT homepage', async function() {
  scope.page = await scope.browser.newPage();
  await scope.page.goto(config.TEST_URL);
});

Then('I expect the page header to be {string}', async function(title: string) {
  const pageTitle = await scope.page.title();
  expect(pageTitle).equal(title);
});
