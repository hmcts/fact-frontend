import {expect} from 'chai';
import { I } from '../utlis/codecept-util';

Given('results are returned', async () => {
  I.seeElement('#search-results');
});

When('I select a court or tribunal link', async () => {
  I.click('#search-results > h2 > a');
});

Given("that location is an 'in-person' court or tribunal", async () => {
  I.dontSeeElement('#not-in-person');
});

Given("that location is a 'not-in-person' court or tribunal", async () => {
  I.seeElement('#not-in-person');
});

Then("I am presented with the profile page for an 'in-person' court or tribunal", async function() {
  I.seeTextEquals('Visit or contact us:','.single-address');
});

Given("that location is not an 'in-person' court or tribunal", async () => {
  I.seeElement('#not-in-person');
});

Then("I am presented with the profile page for a not 'in-person' court or tribunal", async function() {
  I.seeTextEquals('Contact us','.postal-address');
});

Given('that location entry comprises a single address', async () => {
  I.seeElement('.single-address');
});

Then('the type of address is presented to me on the profile page e.g. {string} or {string}', async function(type1: string, type2: string) {
  const headingText = await I.grabTextFrom('.single-address');
  expect(headingText).to.satisfy((value: string) => {
    return value.trim().toLowerCase() === type1 || value.trim().toLowerCase() === type2;
  });

});

Given('the address for that type is presented to me on the profile page', async () => {
  I.seeElement('.single-address');
});

Given('that location entry comprises a primary and secondary address', async () => {
  const elChildrenLength = await I.grabNumberOfVisibleElements('.multiple-addresses');
  expect(elChildrenLength).to.be.greaterThan(1);
});

Then('both types of address are presented to me on the profile page e.g. {string} and {string}', async function(type1: string, type2: string) {
  const addressType1 = await I.grabTextFrom('.multiple-addresses > h2');
  const addressType2 = await I.grabTextFrom('.multiple-addresses:nth-child(2) > h2');
  expect(addressType1.trim().toLowerCase()).equal( type1 );
  expect(addressType2.trim().toLowerCase()).equal( type2 );
});

Given('the addresses for those types are presented on the profile page', async () => {
  I.seeElementInDOM('.multiple-addresses > p');
  I.seeElementInDOM('.multiple-addresses:nth-child(2) > p');
});

Then('both types of address are presented {string} on the profile page', async function(type: string) {
  const element = await I.grabTextFromAll('#addresses');
  I.seeTextEquals(type, element[0]);
});

Given('that location entry includes additional information for that location', async () => {
  I.seeElement('#additional-info');
});

Then('that additional information is presented to me on the profile page', async () => {
  I.seeTextEquals('Additional information', '#additional-info > h3');
});

Given('that location entry includes opening times for one or more services offered', async () => {
  I.seeElement('#opening-times');
});

Then('the type of each service is presented on the profile page', async () => {
  I.seeTextEquals('Opening times','#opening-times > h3');
});

Given('the opening days and hours for each service is presented to me on the profile page', async () => {
  I.seeElement('#opening-times > dl');
});

Given('that location entry includes one or more telephone numbers for a service', async () => {
  I.seeElement('#contacts');
});

Then('the contact description for each service is presented on the profile page', async () => {
  I.seeElement('#contacts > dl > div:nth-child(1) ');
});

Given('the contact details for each service is presented to me on the profile page', async () => {
  I.seeElement('#contacts > dl > div:nth-child(1) > dd.govuk-summary-list__value > a');

});

Given('that location entry includes one or more emails for that service', async () => {
  I.seeElement('#emails');
});

Then('the email description for each service is presented to me on the profile page', async () => {
  I.seeElement('#emails > dl > div > dd.govuk-summary-list__key');
});

Given('the email details for each service is presented to me on the profile page', async () => {
  I.seeElement('#emails > dl > div > dd.govuk-summary-list__value > a');
});

Given('that location entry includes one or building facilities', async () => {
  I.seeElement('#building-facilities');
});

Then('the name of each facility is presented on the profile page', async () => {
  I.seeTextEquals('Parking','#building-facilities > dl > div:nth-child(1) > dd.govuk-summary-list__key');
});

Given('the description of each facility is presented to me on the profile page', async () => {
  I.seeTextEquals('Closest multi-story parking facilities are in Newton Street and Albert Street, approx 5 minutes walk away.','#building-facilities > dl > div:nth-child(1) > dd.govuk-summary-list__value');
});

Given('that location entry does not hide listings for areas of law offered by that location', async () => {
  I.seeElement('#areas-of-law');
});

Given('that location entry includes hearings for one or more areas of law', async () => {
  I.seeElement('#areas-of-law > ul > li');
});

Then('a guidance link for each area of law is presented to me on the profile page', async () => {
  I.seeElement('#areas-of-law > ul > li > a');
});

Then('those area of law details are listed in ascending alphabetical order', async () => {
  const areasOfLaw = await I.grabTextFromAll('#areas-of-law > ul > li > a');
  expect(areasOfLaw).not.equal([]);
  expect(areasOfLaw).equals(areasOfLaw.sort());
});

Given('that location entry hides listings for areas of law offered by that location', async () => {
  I.dontSeeElement('#areas-of-law');
});

Then('no guidance link for the areas of law are presented to me on the profile page', async () => {
  I.dontSeeElement('#areas-of-law');
});

Given('that location entry includes one or more court location codes', async () => {
  const hasLocationCodes = await I.grabNumberOfVisibleElements('#location-codes > p');
  expect(hasLocationCodes).to.be.greaterThan(1);
});

Then('each court type is presented on the profile page', async () => {
  I.seeElement('#location-codes');
});

Given('the court location code for each court type is presented to me on the profile page', async () => {
  I.seeTextEquals('County Court location code: 127','#location-codes > p:nth-child(2)');
});

Then('that location entry includes DX details', async () => {
  I.seeElement('.dx-number');
});

Given('the DX number is presented to me on the profile page', async () => {
  I.seeTextEquals('DX: 701987 Birmingham 7','.dx-number');
});

Given('I can select the directions hyperlink for that location', async () => {
  I.seeElement('#direction-map');
  await I.click('#direction-map > a');
});

Given('that location participates in the Professional users’ court and tribunal access scheme', async () => {
  I.seeTextEquals('This location participates in this scheme','#access-scheme > p.govuk-body-m');
});

Given('that location participates in common platform scheme', async () => {
  I.seeTextEquals('This location participates in this scheme','#common-platform > p');
});

Then('a link to learn about the scheme is included', async () => {
  I.seeElement('#access-scheme > p > a');
});

Given('that location does not participate in the Professional users’ court and tribunal access scheme', async () => {
  I.seeTextEquals('This location does not participate in this scheme','#access-scheme > p.govuk-body-m');
});

Given('That location sidebar includes {string}', async (sidebarEntry: string) => {
  I.seeElement('#'+ sidebarEntry );
});

Then( 'I click the link {string} from {string} and it takes me to the page{string}',async (pageLink: string, sidebarEntry: string, pageTitle: string) => {
  let areasOfLaw = (await I.grabTextFromAll('#' + sidebarEntry + '> ul > li')) as string[];
  areasOfLaw = areasOfLaw.map(function(x){return x.replace('(opens in new tab)', '');});
  let index = areasOfLaw.findIndex(aol => aol.trim().toLowerCase() === pageLink.toLowerCase());

  //adding 1 to 0 based array index to keep the index same for the selected element
  index+=1;
  I.seeElement('#'+ sidebarEntry +' > ul >li:nth-child('+ index +') > a');

  I.seeTextEquals(pageLink,'#'+ sidebarEntry +' > ul >li:nth-child('+ index +') > a');
  I.click('#'+ sidebarEntry + '> ul > li:nth-child('+ index +') > a');
  I.seeTitleEquals(pageTitle);

});

Then('the get an update on my application section is displayed', async () => {
  I.seeElement('#applicationUpdates');
});
