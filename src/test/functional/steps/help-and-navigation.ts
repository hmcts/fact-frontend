import { Then, When } from 'cucumber';
import * as I from '../utlis/puppeteer.util';
import { expect } from 'chai';

Then('I can view the phase banner at the top of that page', async () => {
  const elementExist = await I.checkElement('.govuk-phase-banner');
  expect(elementExist).equal(true);
});

Then('I can view the content information banner', async () => {
  const elementExist = await I.checkElement('.govuk-footer');
  expect(elementExist).equal(true);
});

When('I can select a hyperlink in the content banner', async () => {
  const elementExist = await I.checkElement('.govuk-footer__inline-list-item');
  expect(elementExist).equal(true);
  await I.click('.govuk-footer__inline-list-item');
});

When('I select the back button', async () => {
  const elementExist = await I.checkElement('.govuk-back-link');
  expect(elementExist).equal(true);
  await I.click('.govuk-back-link');
});

When('I can select the feedback link', async () => {
  const elementExist = await I.checkElement('.govuk-link');
  expect(elementExist).equal(true);
  await I.click('.govuk-link');
});
