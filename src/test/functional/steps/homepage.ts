import { Given, Then } from 'cucumber';
import { expect } from 'chai';

import { config } from '../../config';

Given('I am on FACT homepage', function() {
  return this.driver.get(config.TEST_URL);
});

Then('I expect the page header to be {string}', async function(title: string) {
  const pageTitle = await this.driver.getTitle();
  expect(pageTitle).equal(title);
});
