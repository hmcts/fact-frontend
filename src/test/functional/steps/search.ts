import { Given, When, Then } from 'cucumber';
import { expect } from 'chai';

import * as I from '../utlis/puppeteer.util';

Given('I navigate to the Search Page', async () => {
  await I.click('.govuk-button');
});

When('I select {string}', async (option: string) => {
  const element = option === 'I have the name' ? '#i-have-the-name' : '#i-do-not-have-the-name';
  I.click(element);
  await I.click('.govuk-button');
});

Then('I can select the option to search for {string}', async (search: string) => {
  const elementExist = await I.checkElement('#search');
  expect(elementExist).equal(true);
  await I.fillField('#search', search);
});
