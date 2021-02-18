import {Given, Then} from 'cucumber';
import * as I from '../utlis/puppeteer.util';
import {config} from '../../config';
import {expect} from 'chai';

Given('the postcode search page loads', async () => {
  await I.newPage();
  await I.goTo(config.TEST_URL + '/services/crime/major-criminal-offences/search-by-postcode');
});

Given('the search option page loads', async () => {
  await I.newPage();
  await I.goTo(config.TEST_URL + '/search-option');
});

Given('the choose action page loads', async () => {
  await I.newPage();
  await I.goTo(config.TEST_URL + '/service-choose-action');
});

Given('the search by name page loads', async () => {
  await I.newPage();
  await I.goTo(config.TEST_URL + '/search-by-name');
});

Given('the choose service page loads', async () => {
  await I.newPage();
  await I.goTo(config.TEST_URL + '/services/nearest');
});

Then('it contains a metadata description tag', async () => {
  const elementExist = await I.checkElement('head > meta[name="description"]');
  expect(elementExist).equal(true);
});
