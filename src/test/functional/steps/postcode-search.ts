import { Given, Then, When } from 'cucumber';

import * as I from '../utlis/puppeteer.util';
import { expect } from "chai";

Given('I can select a {string} from the category area of law page', async (option: string) => {
  await I.click(option);
});

When('I continue having entered a postcode {string}', async (postcode: string) => {
  await I.fillField('#postcode', postcode);
});

Then('I can continue my user journey', async () => {
  await I.click('.govuk-button');
});

When('I continue having entered an invalid postcode {string}', async (postcode: string) => {
  await I.fillField('#postcode', postcode);
});

Then('I am presented with an postcode error message', async() => {
  const elementExist = await I.checkElement('#postcode-error');
  expect(elementExist).equal(true);
});
