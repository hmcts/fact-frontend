import {Given, Then} from 'cucumber';
import * as I from '../utlis/puppeteer.util';
import {config} from '../../config';
import {expect} from 'chai';

Given('the postcode search page loads', async () => {
  await I.newPage();
  await I.goTo(config.TEST_URL + '/services/crime/major-criminal-offences/search-by-postcode');
});

Then('it contains a metadata description tag', async () => {
  const elementExist = await I.checkElement('head > meta[name="description"]');
  expect(elementExist).equal(true);
});
