import { Given, Then, When } from 'cucumber';
import * as I from '../utlis/puppeteer.util';
import { expect } from 'chai';

Given('results are returned', async () => {
  const elementExist = await I.checkElement('#search-results');
  expect(elementExist).equal(true);
});

When('I select a court or tribunal link', async () => {
  await I.click('#search-results > a');
});

Given("that location is an 'in-person' court or tribunal", async () => {
  const addressElement = await I.checkElement('#not-in-person');
  expect(addressElement).equal(false);
});

Then("I am presented with the profile page for an 'in-person' court or tribunal", async function() {
  const addressElement = await I.checkElement('#addresses');
  const subHeadingElement = await I.getElement('h2');
  const subHeading = await I.getElementText(subHeadingElement);
  expect(addressElement).equal(true);
  expect(subHeading).equal('Visit or contact us:');
});

Given("that location is not an 'in-person' court or tribunal", async () => {
  const addressElement = await I.checkElement('#not-in-person');
  expect(addressElement).equal(true);

});

Then("I am presented with the profile page for a not 'in-person' court or tribunal", async function() {
  const subHeadingElement = await I.getElement('h2');
  const subHeading = await I.getElementText(subHeadingElement);
  expect(subHeading).equal('Contact us:');
});

Given('that location entry comprises a single address', async () => {
  const element = await I.getElement('#addresses');
  const elChildrenLength = await I.checkElementLength(element.children);
  expect(elChildrenLength).equal(1);
});

Then('the type of address is presented to me on the profile page e.g. {string} or {string}', async function(type1: string, type2: string) {
  const element = await I.getElement('#addresses');
  const headingText = await I.getElementText(element[0]);
  expect(headingText).to.satisfy((value: string) => {
    return value.toLowerCase() === type1 || value.toLowerCase() === type2;
  });
});

Given('the address for that type is presented to me on the profile page', async () => {
  const element = await I.getElement('#addresses');
  expect(element.children[0]).not.to.be(null);
});

Then('both types of address are presented to me on the profile page e.g. {string} and {string}', async function(type1: string, type2: string) {
  const element = await I.getElement('#addresses');
  const addressText1 = await I.getElementText(element[0]);
  const addressText2 = await I.getElementText(element[1]);
  expect(addressText1).equal(type1);
  expect(addressText2).equal(type2);
});

Given('the addresses for those types are presented on the profile page', async () => {
  const element = await I.getElement('#addresses');
  expect(element.children[0]).not.to.be(null);
  expect(element.children[1]).not.to.be(null);
});

Given('that location entry comprises a primary and secondary address', async () => {
  const element = await I.getElement('#addresses');
  const elChildrenLength = await I.checkElementLength(element.children);
  expect(elChildrenLength).to.be.greaterThan(1);
});

Then('both types of address are presented {string} on the profile page', async function(type: string) {
  const element = await I.getElement('#addresses');
  const headingText = await I.getElementText(element[0]);
  expect(headingText).equal(type);
});

Given('that location entry includes an urgent notice for that location', async () => {
  const isCourtUrgent = await I.checkElement('#urgent-notice');
  expect(isCourtUrgent).equal(true);
});

Then('that urgent notice is presented to me on the profile page', async () => {
  const urgentNoticeEl = await I.getElement('#urgent-notice');
  const text = await I.getElementText(urgentNoticeEl);
  expect(text).equal('Urgent in-person application');
});

Given('that location entry includes additional information for that location', async () => {
  const hasAdditionalInfo = await I.checkElement('#additional-info');
  expect(hasAdditionalInfo).equal(true);
});

Then('that additional information is presented to me on the profile page', async () => {
  const element = await I.getElement('#additional-info');
  const text = await I.getElementText(element);
  expect(text).equal('Additional Information');
  expect(element.children[0]).not.to.be(null);
});

Given('that location entry includes opening times for one or more services offered', async () => {
  const hasOpeningTimes = await I.checkElement('#opening-times');
  expect(hasOpeningTimes).equal(true);
});

Then('the type of each service is presented on the profile page', async () => {
  const element = await I.getElement('#opening-times');
  const text = await I.getElementText(element.children[0].children[0]);
  expect(text).equal('Court counter open');
});

Given('the opening days and hours for each service is presented to me on the profile page', async () => {
  const element = await I.getElement('#opening-times');
  const text = await I.getElementText(element.children[0].children[1]);
  expect(text).equal('Monday to Friday 9am to 5pm');
});

Given('that location entry includes one or more telephone numbers for a service', async () => {
  const hasTelephoneInfo = await I.checkElement('#contacts');
  expect(hasTelephoneInfo).equal(true);
});

Given('that location entry does not include one or more emails for that service', async () => {
  const hasEmailInfo = await I.checkElement('#emails');
  expect(hasEmailInfo).equal(false);
});

Then('the contact description for each service is presented on the profile page', async () => {
  const element = await I.getElement('#contacts');
  const text = await I.getElementText(element.children[0].children[0]);
  expect(text).equal('Court counter open');
});

Given('the contact details for each service is presented to me on the profile page', async () => {
  const element = await I.getElement('#contacts');
  const text = await I.getElementText(element.children[0].children[1]);
  expect(text).equal('Court of Protection');
});

Given('that location entry includes one or more emails for that service', async () => {
  const hasEmailInfo = await I.checkElement('#email');
  expect(hasEmailInfo).equal(true);
});

Given('that location entry does not include one or more telephone numbers for that service', async () => {
  const hasTelephoneInfo = await I.checkElement('#contacts');
  expect(hasTelephoneInfo).equal(false);
});

Then('the email description for each service is presented to me on the profile page', async () => {
  const element = await I.getElement('#email');
  const text = await I.getElementText(element.children[0].children[0]);
  expect(text).equal('Court counter open');
});

Given('the email details for each service is presented to me on the profile page', async () => {
  const element = await I.getElement('#contacts');
  const text = await I.getElementText(element.children[0].children[1]);
  expect(text).equal('urgent.birmingham.cfjc@justice.gov.uk');
});

Given('that location entry includes one or building facilities', async () => {
  const hasBuildingFacilities = await I.checkElement('#building-facilities');
  expect(hasBuildingFacilities).equal(true);
});

Then('the name of each facility is presented on the profile page', async () => {
  const element = await I.getElement('#building-facilities');
  const text = await I.getElementText(element.children[0].children[0]);
  expect(text).equal('Disabled toilet');
});

Given('the description of each facility is presented to me on the profile page', async () => {
  const element = await I.getElement('#building-facilities');
  const text = await I.getElementText(element.children[0].children[1]);
  expect(text).equal('Located on every floor.');
});

Given('that location entry does not hide listings for areas of law offered by that location', async () => {
  const hasAreasOfLaw = await I.checkElement('#areas-of-law');
  expect(hasAreasOfLaw).equal(true);
});

Given('that location entry includes hearings for one or more areas of law', async () => {
  const element = await I.getElement('#areas-of-law');
  const elChildrenLength = await I.checkElementLength(element.children);
  expect(elChildrenLength).to.be.greaterThan(1);
});

Then('a guidance link for each area of law is presented to me on the profile page', async () => {
  const element = await I.getElement('#areas-of-law');
  const isElementAnchor = await I.checkElementIsAnchor(element.children[0]);
  expect(isElementAnchor).equal(true);
});

Then('those area of law details are listed in ascending alphabetical order', async () => {
  const element = await I.getElement('#areas-of-law');
  const areasOfLaw = await I.getArrayFromElement(element);
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
  const hasLocationCodes = await I.checkElement('#location-codes');
  expect(hasLocationCodes).equal(true);
});

Then('each court type is presented on the profile page', async () => {
  const element = await I.checkElement('#location-codes');
  expect(element).equal(true);
});

Given('the court location code for each court type is presented to me on the profile page', async () => {
  const element = await I.getElement('#location-codes');
  const text = await I.getElementText(element.children[0]);
  expect(text).equal('County Court location code: 127');
});

Then('that location entry includes DX details', async () => {
  const hasDx = await I.checkElement('#dx');
  expect(hasDx).equal(true);
});

Given('the DX number is presented to me on the profile page', async () => {
  const element = await I.getElement('#dx');
  const text = await I.getElementText(element.children[0]);
  expect(text).equal('DX: 701987 Birmingham 7');
});
