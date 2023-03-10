
import { config as testConfig } from '../../config';
import { expect } from 'chai';
import { I } from '../utlis/codecept-util';

Given('the postcode search page loads', async () => {
  await I.amOnPage(testConfig.TEST_URL + '/services/crime/major-criminal-offences/nearest/search-by-postcode');
});

Given('the search option page loads', async () => {
  await I.amOnPage(testConfig.TEST_URL + '/search-option');
});

Given('the choose action page loads', async () => {
  await I.amOnPage(testConfig.TEST_URL + '/service-choose-action');
});

Given('the search by name page loads', async () => {
  await I.amOnPage(testConfig.TEST_URL + '/search-by-name');
});

Given('the choose service page loads', async () => {
  await I.amOnPage(testConfig.TEST_URL + '/services/nearest');
});

Given('the service results page loads', async () => {
  await I.amOnPage(testConfig.TEST_URL + '/services/crime/minor-criminal-offences/search-results');
});

Given('the postcode search results page loads', async () => {
  await I.amOnPage(testConfig.TEST_URL + '/services/money/money-claims/nearest/courts/near?postcode=GU1+4UW');
});

Given('the service not found page loads', async () => {
  await I.amOnPage(testConfig.TEST_URL + '/services/unknown-service');
});

Given('the service areas page loads', async () => {
  await I.amOnPage(testConfig.TEST_URL + '/services/money/service-areas/nearest');
});

Given('an in-person court page loads', async () => {
  await I.amOnPage(testConfig.TEST_URL + '/courts/birmingham-civil-and-family-justice-centre');
});

Given('an not-in-person court page loads', async () => {
  await I.amOnPage(testConfig.TEST_URL + '/courts/county-court-money-claims-centre-ccmcc');
});

Then('it contains a metadata description tag', async () => {
  I.seeElementInDOM('head > meta[name="description"]');
});
