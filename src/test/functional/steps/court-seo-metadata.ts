import {Given, Then} from 'cucumber';
import * as I from '../utlis/puppeteer.util';
import {config} from '../../config';
import {expect} from 'chai';

Given('an in-person-court details page loads', async () => {
  await I.newPage();
  await I.goTo(config.TEST_URL + '/courts/birmingham-civil-and-family-justice-centre');
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
    expect(structuredDataObject['@type']).to.equal('Courthouse');
    expect(structuredDataObject['name']).to.equal('Birmingham Civil and Family Justice Centre');
    expect(structuredDataObject['address']).to.deep.equal({
      '@type': 'PostalAddress',
      'streetAddress': 'Priory Courts, 33 Bull Street',
      'addressLocality': 'Birmingham',
      'postalCode': 'B4 6DS',
      'addressCountry': 'GB'
    });
  } catch (e) {
    expect.fail('JSON parse failed for structured data object');
  }
});

