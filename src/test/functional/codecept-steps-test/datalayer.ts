import { config as testConfig } from '../../config';
import { expect } from 'chai';
import { I } from '../utlis/codecept-util'

const scope = require('../support/scope');

Given('A page loads', async function () {
  await I.amOnPage(testConfig.TEST_URL + '/');
});

Then('There is language object in the dataLayer', async () => {
  //const dataLayer = I.grabValueFrom('dataLayer');
  const dataLayer = await scope.page.evaluate('dataLayer');
  //const dataLayer = await I.getDataLayer();
console.log('.......datalayer..........' + dataLayer);
  //expect(dataLayer.filter((o: { language: any }) => o.language).length).eql(1);
});

When('I switch language', async () => {
  await I.click('.fact-language');
});
//
// Then('The language object contains {string}', async (lang: string) => {
//   const dataLayer = await I.getDataLayer();
//   expect(dataLayer.filter((o: { language: any }) => o.language).map((o: { language: any }) => o.language)).eql([lang]);
// });
//
// Given('A page renders an error', async function () {
//   await I.newPage();
//   await I.goTo(config.TEST_URL + '/search-option');
//   await I.click('.continue');
//   const elementExist = await I.checkElement('#know-location-error');
//   expect(elementExist).equal(true);
// });
//
// Then('There is an error message object in the dataLayer', async () => {
//   const dataLayer = await I.getDataLayer();
//   expect(dataLayer.filter((o: { errormsg: any }) => o.errormsg).length).eql(1);
// });
