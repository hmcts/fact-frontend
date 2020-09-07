import { Given, Then } from 'cucumber';
import { expect } from 'chai';

Given('I am on FACT homepage', function() {
  return this.driver.get('http://localhost:3100/');
});

Then('I expect the page header to be {string}', async function(title: string) {
  const pageTitle = await this.driver.getTitle();
  expect(pageTitle).equal(title);
});
