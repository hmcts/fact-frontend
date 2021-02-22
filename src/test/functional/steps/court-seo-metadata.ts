import {Given, Then} from 'cucumber';
import * as I from '../utlis/puppeteer.util';
import {config} from '../../config';
import {expect} from 'chai';

Given('a {string} page with the court slug {string} loads', async function (courtType: string, courtSlug: string) {
  await I.newPage();
  await I.goTo(config.TEST_URL + '/courts/' + courtSlug);

  const elementExist = await I.checkElement('.court-tribunal-details');
  expect(elementExist).equal(true);
});

Then('the page should contain a script element containing structured data', async () => {
  const structuredDataElement = await I.checkElement('script[type="application/ld+json"]');
  expect(structuredDataElement).equal(true);
});

Then('it should be parseable into a JSON object', async () => {
  const structuredData = await I.getElementText(await I.getElement('script[type="application/ld+json"]'));
  try {
    const structuredDataObject = await JSON.parse(structuredData);
    expect(structuredDataObject['@context']).to.equal('https://schema.org');
    expect(structuredDataObject['@type']).to.equal('GovernmentOffice');
    expect(structuredDataObject['name']).to.exist;
    expect(structuredDataObject['address']).to.exist;
    expect(structuredDataObject['image']).to.exist;
  } catch (e) {
    expect.fail('JSON parse failed for structured data object');
  }
});
