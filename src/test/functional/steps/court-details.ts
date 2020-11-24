import { Given, Then, When } from 'cucumber';
import * as I from '../utlis/puppeteer.util';
import { expect } from 'chai';

Given('results are returned', async () => {
  const elementExist = await I.checkElement('#search-results');
  expect(elementExist).equal(true);
});

When('I select a court or tribunal link', async () => {
  await I.click('#search-results > h2 > a');
});

Given("that location is an 'in-person' court or tribunal", async () => {
  const addressElement = await I.checkElement('#not-in-person');
  expect(addressElement).equal(false);
});

Then("I am presented with the profile page for an 'in-person' court or tribunal", async function() {
  const addressElement = await I.checkElement('.single-address');
  const subHeadingElement = await I.getElement('.single-address');
  const subHeading = await I.getElementText(subHeadingElement);
  expect(addressElement).equal(true);
  expect(subHeading).equal('Visit or contact us:');
});

Given("that location is not an 'in-person' court or tribunal", async () => {
  const addressElement = await I.checkElement('#not-in-person');
  expect(addressElement).equal(true);

});

Then("I am presented with the profile page for a not 'in-person' court or tribunal", async function() {
  const subHeadingElement = await I.getElement('.postal-address');
  const subHeading = await I.getElementText(subHeadingElement);
  expect(subHeading).equal('Contact us');
});

Given('that location entry comprises a single address', async () => {
  const addressElement = await I.checkElement('.single-address');
  expect(addressElement).equal(true);
});

Then('the type of address is presented to me on the profile page e.g. {string} or {string}', async function(type1: string, type2: string) {
  const element = await I.getElement('.single-address');
  const headingText = await I.getElementText(element);
  expect(headingText).to.satisfy((value: string) => {
    return value.toLowerCase() === type1 || value.toLowerCase() === type2;
  });
});

Given('the address for that type is presented to me on the profile page', async () => {
  const subHeadingElement = await I.checkElement('.single-address');
  expect(subHeadingElement).equal(true);
});

Given('that location entry comprises a primary and secondary address', async () => {
  const elChildrenLength = await I.checkElementLength('.multiple-addresses');
  expect(elChildrenLength).to.be.greaterThan(1);
});

Then('both types of address are presented to me on the profile page e.g. {string} and {string}', async function(type1: string, type2: string) {
  const element = await I.getElement('.multiple-addresses > h2');
  const secondElement = await I.getElement('.multiple-addresses:nth-child(2) > h2');
  const addressType1 = await I.getElementText(element);
  const addressType2 = await I.getElementText(secondElement);
  expect(addressType1.toLowerCase()).equal(type1);
  expect(addressType2.toLowerCase()).equal(type2);
});

Given('the addresses for those types are presented on the profile page', async () => {
  const element = await I.getElement('.multiple-addresses > p');
  const secondElement = await I.getElement('.multiple-addresses:nth-child(2) > p');
  expect(element).not.equal(null);
  expect(secondElement).not.equal(null);
});

Then('both types of address are presented {string} on the profile page', async function(type: string) {
  const element = await I.getElement('#addresses');
  const headingText = await I.getElementText(element[0]);
  expect(headingText).equal(type);
});

Given('that location entry includes an urgent message for that location', async () => {
  const isCourtUrgent = await I.checkElement('#urgent-message');
  expect(isCourtUrgent).equal(true);
});

Then('that urgent notice is presented to me on the profile page', async () => {
  const isCourtUrgentText = await I.checkElement('.govuk-warning-text');
  expect(isCourtUrgentText).equal(true);
});

Given('that location entry includes additional information for that location', async () => {
  const hasAdditionalInfo = await I.checkElement('#additional-info');
  expect(hasAdditionalInfo).equal(true);
});

Then('that additional information is presented to me on the profile page', async () => {
  const element = await I.getElement('#additional-info > h3');
  const text = await I.getElementText(element);
  expect(text).equal('Coronavirus (COVID-19) Update');
});

Given('that location entry includes opening times for one or more services offered', async () => {
  const hasOpeningTimes = await I.checkElement('#opening-times');
  expect(hasOpeningTimes).equal(true);
});

Then('the type of each service is presented on the profile page', async () => {
  const element = await I.getElement('#opening-times > h3');
  const text = await I.getElementText(element);
  expect(text).equal('Opening times');
});

Given('the opening days and hours for each service is presented to me on the profile page', async () => {
  const element = await I.checkElement('#opening-times > p');
  expect(element).equal(true);
});

Given('that location entry includes one or more telephone numbers for a service', async () => {
  const hasTelephoneInfo = await I.checkElement('#contacts');
  expect(hasTelephoneInfo).equal(true);
});

Then('the contact description for each service is presented on the profile page', async () => {
  const element = await I.checkElement('#contacts > div > .govuk-grid-column-one-third > p');
  expect(element).equal(true);
});

Given('the contact details for each service is presented to me on the profile page', async () => {
  const element = await I.checkElement('#contacts > div > .govuk-grid-column-two-thirds > div > a');
  expect(element).equal(true);
});

Given('that location entry includes one or more emails for that service', async () => {
  const hasEmailInfo = await I.checkElement('#emails');
  expect(hasEmailInfo).equal(true);
});

Then('the email description for each service is presented to me on the profile page', async () => {
  const element = await I.checkElement('#emails > div > .govuk-grid-column-one-third > p');
  expect(element).equal(true);
});

Given('the email details for each service is presented to me on the profile page', async () => {
  const element = await I.checkElement('#emails > div > .govuk-grid-column-two-thirds > div > a');
  expect(element).equal(true);
});

Given('that location entry includes one or building facilities', async () => {
  const hasBuildingFacilities = await I.checkElement('#building-facilities');
  expect(hasBuildingFacilities).equal(true);
});

Then('the name of each facility is presented on the profile page', async () => {
  const element = await I.getElement('#building-facilities > h4');
  const text = await I.getElementText(element);
  expect(text).equal('Disabled toilet');
});

Given('the description of each facility is presented to me on the profile page', async () => {
  const element = await I.getElement('#building-facilities > p:nth-child(4)');
  const text = await I.getElementText(element);
  expect(text).equal('Located on every floor.');
});

Given('that location entry does not hide listings for areas of law offered by that location', async () => {
  const hasAreasOfLaw = await I.checkElement('#areas-of-law');
  expect(hasAreasOfLaw).equal(true);
});

Given('that location entry includes hearings for one or more areas of law', async () => {
  const elChildrenLength = await I.checkElementLength('#areas-of-law > ul > li');
  expect(elChildrenLength).to.be.greaterThan(1);
});

Then('a guidance link for each area of law is presented to me on the profile page', async () => {
  const element = await I.getElement('#areas-of-law > ul > li > a');
  const isElementAnchor = await I.checkElementIsAnchor(element);
  expect(isElementAnchor).equal(true);
});

Then('those area of law details are listed in ascending alphabetical order', async () => {
  const elements = await I.getElements('#areas-of-law > ul > li > a');
  const areasOfLaw = await I.getTextFromList(elements);
  expect(areasOfLaw).not.equal([]);
  expect(areasOfLaw).equals(areasOfLaw.sort());
});

Given('that location entry hides listings for areas of law offered by that location', async () => {
  const hasAreasOfLaw = await I.checkElement('#areas-of-law');
  expect(hasAreasOfLaw).equal(false);
});

Then('no guidance link for the areas of law are presented to me on the profile page', async () => {
  const hasAreasOfLaw = await I.checkElement('#areas-of-law');
  expect(hasAreasOfLaw).equal(false);
});

Given('that location entry includes one or more court location codes', async () => {
  const hasLocationCodes = await I.checkElementLength('#location-codes > p');
  expect(hasLocationCodes).to.be.greaterThan(1);
});

Then('each court type is presented on the profile page', async () => {
  const element = await I.checkElement('#location-codes');
  expect(element).equal(true);
});

Given('the court location code for each court type is presented to me on the profile page', async () => {
  const element = await I.getElement('#location-codes > p');
  const text = await I.getElementText(element);
  expect(text).equal('County Court location code: 127');
});

Then('that location entry includes DX details', async () => {
  const hasDx = await I.checkElement('.dx-number');
  expect(hasDx).equal(true);
});

Given('the DX number is presented to me on the profile page', async () => {
  const element = await I.getElement('.dx-number');
  const text = await I.getElementText(element);
  expect(text).equal('DX: 701987 Birmingham 7');
});

Given('I can select the directions hyperlink for that location', async () => {
  const hasDx = await I.checkElement('#direction-map');
  expect(hasDx).equal(true);
  await I.click('#direction-map > a');
});

Given('that location participates in the Professional users’ court and tribunal access scheme', async () => {
  const element = await I.getElement('#access-scheme > p');
  const text = await I.getElementText(element);
  expect(text).equal('This location participates in this scheme');
});

Then('a link to learn about the scheme is included', async () => {
  const element = await I.getElement('#access-scheme > a');
  const isElementAnchor = await I.checkElementIsAnchor(element);
  expect(isElementAnchor).equal(true);
});

Given('that location does not participate in the Professional users’ court and tribunal access scheme', async () => {
  const element = await I.getElement('#access-scheme > p');
  const text = await I.getElementText(element);
  expect(text).equal('This location does not participate in this scheme');
});
