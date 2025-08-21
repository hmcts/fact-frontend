import { expect } from 'chai';
import { I } from '../utlis/codecept-util';

Then('I can view the cookie options within the cookie banner', async () => {
  I.seeElement('.cookie-banner');
});

When('I select that hyperlink in the cookie banner', async () => {
  I.click('.cookie-banner-message a');
});

Then(
  'I am redirected and expect the page header to be {string}',
  async function (title: string) {
    const pageTitle = await I.grabTitle();
    expect(pageTitle).equal(title);
  },
);

Then(
  'I can view the cookies hyperlink link within the page footer',
  async () => {
    I.seeElement('.govuk-footer__inline-list-item:nth-child(4) > a');
  },
);

When('I select that hyperlink', async () => {
  I.clickLink('.govuk-footer__inline-list-item:nth-child(4) > a');
});
