import {config as testConfig} from '../../config';
import {expect} from 'chai';
import {I} from '../utlis/codecept-util';

Given('A page loads', async function () {
  await I.amOnPage(testConfig.TEST_URL + '/');
});

Then('There is language object in the dataLayer', async () => {
  const dataLayer = await I.executeScript(function () {
    return dataLayer;
  });
  expect(dataLayer.filter((o: { language: any }) => o.language).length).eql(1);
});

When('I switch language', async () => {
  await I.click('.fact-language');
});

Then('The language object contains {string}', async (lang: string) => {
  const dataLayer = await I.executeScript(function () {
    return dataLayer;
  });
  expect(dataLayer.filter((o: { language: any }) => o.language).map((o: { language: any }) => o.language)).eql([lang]);
});

Given('A page renders an error', async function () {
  I.amOnPage(testConfig.TEST_URL + '/search-option');
  I.click('.continue');
  I.seeElement('#know-location-error');
});

Then('There is an error message object in the dataLayer', async () => {
  const dataLayer = await I.executeScript(function () {
    return dataLayer;
  });
  expect(dataLayer.filter((o: { errormsg: any }) => o.errormsg).length).eql(1);
});
