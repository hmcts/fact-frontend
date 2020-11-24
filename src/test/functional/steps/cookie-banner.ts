import { Then, When } from 'cucumber';
import * as I from '../utlis/puppeteer.util';
import { expect } from 'chai';

Then('I can view the cookie options within the cookie banner', async () => {
  const elementExist = await I.checkElement('.global-cookie-message');
  expect(elementExist).equal(true);
});

When('I select that hyperlink in the cookie banner', async () => {
  await I.click('.global-cookie-message > div > p > a');
});

Then('I am redirected and expect the page header to be {string}', async function(title: string) {
  const pageTitle = await I.getPageTitle();
  expect(pageTitle).equal(title);
});

Then('I can view the cookies hyperlink link within the page footer', async () => {
  const element = await I.getElement('.govuk-footer__inline-list-item:nth-child(4)');
  const elementExist = await I.checkElementIsAnchor(element);
  expect(elementExist).equal(true);
});

When('I select that hyperlink', async () => {
  await I.click('.govuk-footer__inline-list-item:nth-child(4)');
});
