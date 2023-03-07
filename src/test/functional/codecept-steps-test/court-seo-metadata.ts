import { config as testConfig } from '../../config';
import { expect } from 'chai';
import { I } from '../utlis/codecept-util'

Given('a {string} page with the court slug {string} loads', async function (courtType: string, courtSlug: string) {
  I.amOnPage(testConfig.TEST_URL + '/courts/' + courtSlug);
  I.seeElement('.court-tribunal-details');
});

Then('the page should contain a script element containing structured data', async () => {
  I.seeElementInDOM('script[type="application/ld+json"]');
});

Then('it should be parseable into a JSON object', async () => {
  const structuredData = await I.grabTextFrom('script[type="application/ld+json"]');
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
