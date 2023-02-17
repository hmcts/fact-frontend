import { I } from './codecept-utils'

Given('I navigate to the Search Page', async () => {
  await I.click('.continue');
});

When('I select {string}', async (option: string) => {
  const element = option === 'I have the name' ? '#i-have-the-name' : '#i-do-not-have-the-name';
  await I.click(element);
  await I.click('.continue');
});

Then('test', async () => {
  console.log("test..........");

});
// Then('I can select the option to search for {string}', async (search: string) => {
//   const elementExist = await I.checkElement('#search');
//   expect(elementExist).equal(true);
//   await I.fillField('#search', search);
// });
//
// Given('I have entered {string} as search criteria', async (search: string) => {
//   //await I.fillField('#search', search);
//   await I.setInputField('#search', search);
// });
//
// When('I have selected to search for that court or tribunal name or address', async () => {
//   await I.click('.continue');
// });
//
// Then('all courts and tribunals are listed in sorting rules order where the entered content is within any name or address field where partial search content is sufficient', async () => {
//   const elementExist = await I.checkElement('#search-results');
//   expect(elementExist).equal(true);
// });
//
// Given('any listed entry can be selected via a hyperlink', async () => {
//   const element = await I.getElement('#search-results > h2 > a');
//   const elementExist = await I.checkElementIsAnchor(element);
//   expect(elementExist).equal(true);
// });
//
// Then('all courts and tribunals are listed in sorting rules order where the entered content is within any name or address field where full search content is required', async () => {
//   const elementExist = await I.checkElement('#search-results');
//   expect(elementExist).equal(true);
// });
//
// When('I have selected to search for that content', async () => {
//   await I.click('.continue');
// });

// Then('all courts and tribunals within that full postcode location are listed', async () => {
//   const elementExist = await I.checkElement('#search-results');
//   expect(elementExist).equal(true);
// });
//
// Given('those entries are listed in sorting rules order', async () => {
//   const elementExist = await I.checkElement('#search-results');
//   expect(elementExist).equal(true);
// });
//
// Then('all courts and tribunals within that partial postcode location are listed', async () => {
//   const elementExist = await I.checkElement('#search-results');
//   expect(elementExist).equal(true);
// });
//
// Given('I have not entered search content', async () => {
//   const elementExist = await I.checkElement('#search');
//   expect(elementExist).equal(true);
// });
//
// Then('I am presented with an error', async () => {
//   const elementExist = await I.checkElement('#search-error');
//   expect(elementExist).equal(true);
// });
//
// Given('there are no matching results', async () => {
//   const elementExist = await I.checkElement('#no-search-results');
//   expect(elementExist).equal(true);
// });
//
// Given('I am presented with a no matching results display', async () => {
//   const element = await I.getElement('#no-search-results > p');
//   const text = await I.getElementText(element);
//   expect(text).equal('There are no matching results.');
// });
//
// Given('I can re-enter search content', async () => {
//   const elementExist = await I.checkElement('#search');
//   expect(elementExist).equal(true);
// });
//
// Given('I can enter {string}', async (search: string) => {
//   const elementExist = await I.checkElement('#search');
//   expect(elementExist).equal(true);
//   await I.fillField('#search', search);
// });
//
// Given('I can select to search for that content', async () => {
//   const elementExist = await I.checkElement('.continue');
//   expect(elementExist).equal(true);
// });
