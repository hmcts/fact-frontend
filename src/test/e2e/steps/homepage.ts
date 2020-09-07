import { Given, Then } from 'cucumber';
import { expect } from 'chai';

Given('I am on FACT homepage', function() {
  return this.driver.get('http://localhost:3100/');
});

Then('I expect the page header to be {string}', function(title: string) {
  expect(title).equal('Find a Court');
  return title;
});
