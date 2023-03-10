import {expect} from 'chai';
import { I } from '../utlis/codecept-util';

Then('I can view the phase banner at the top of that page', async () => {
  I.seeElement('.govuk-phase-banner');
});

Then('I can view the content information banner', async () => {
  I.seeElement('.govuk-footer');
});

When('I can select a hyperlink in the content banner', async () => {
  I.seeElement('.govuk-footer__inline-list-item');
  I.click('.govuk-footer__inline-list-item');
});

When('I select the back button', async () => {
  I.seeElement('.govuk-back-link');
  I.click('.govuk-back-link');
});

When('I can select the feedback link', async () => {
  I.seeElement('.govuk-link');
  I.click('.govuk-link');
});
