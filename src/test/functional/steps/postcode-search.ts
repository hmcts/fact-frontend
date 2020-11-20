import { Given, Then, When } from 'cucumber';

import * as I from '../utlis/puppeteer.util';
import { expect } from 'chai';

Given('I can select a {string} from the category area of law page and continue', async (element: string) => {
  await I.click(element);
  await I.click('.govuk-button');
});

When('I continue having entered a postcode {string}', async (postcode: string) => {
  await I.fillField('#postcode', postcode);
});

Then('I can continue my user journey', async () => {
  await I.click('.govuk-button');
});

When('I continue having entered an invalid postcode {string}', async (postcode: string) => {
  await I.fillField('#postcode', postcode);
  await I.click('.govuk-button');
});

Then('I am presented with an postcode error {string}', async(message: string) => {
  const elementExist = await I.checkElement('#postcode-error');
  expect(elementExist).equal(true);
  const element = await I.getElement('#postcode-error');
  const errorMessage = await I.getElementText(element);
  expect(errorMessage).equal('Error:\n' + message);
});
