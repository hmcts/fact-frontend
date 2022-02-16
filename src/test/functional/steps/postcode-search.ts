import { Given, Then, When } from 'cucumber';

import * as I from '../utlis/puppeteer.util';
import { expect } from 'chai';

Given('I can select a {string} from the category area of law page and continue', async (element: string) => {
  await I.click(element);
  await I.click('.continue');
});

When('I continue having entered a postcode {string}', async (postcode: string) => {
  await I.fillField('#postcode', postcode);
});

Then('I select the option to search by postcode via the hyperlink', async () => {
  const element = await I.getElement('#main-content > div > div > p:nth-child(4) > a');
  const elementExist = await I.checkElementIsAnchor(element);
  expect(elementExist).equal(true);
  await I.click('#main-content > div > div > p:nth-child(4) > a');
});

Then('I can continue my user journey', async () => {
  await I.click('.continue');
});

When('I continue having entered an invalid postcode {string}', async (postcode: string) => {
  await I.fillField('#postcode', postcode);
  await I.click('.continue');
});

Then('I am presented with an postcode error {string}', async(message: string) => {
  const elementExist = await I.checkElement('#postcode-error');
  expect(elementExist).equal(true);
  const element = await I.getElement('#postcode-error');
  const errorMessage = await I.getElementText(element);
  expect(errorMessage.includes('Error:')).equal(true);
  expect(errorMessage.replace(/[\n\r]+/g, '').replace('Error:', '').trim()).equal(message.trim());
});
