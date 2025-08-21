import { I } from '../utlis/codecept-util';
import { expect } from 'chai';

Given(
  'I can select a {string} from the category area of law page and continue',
  async (element: string) => {
    I.click(element);
    I.click('.continue');
  },
);

When(
  'I continue having entered a postcode {string}',
  async (postcode: string) => {
    I.fillField('#postcode', postcode);
  },
);

Then(
  'I select the option to search by postcode via the hyperlink',
  async () => {
    I.seeElement('#main-content > div > div > p:nth-child(4) > a');
    I.click('#main-content > div > div > p:nth-child(4) > a');
  },
);

Then('I can continue my user journey', async () => {
  I.click('.continue');
});

When(
  'I continue having entered an invalid postcode {string}',
  async (postcode: string) => {
    I.fillField('#postcode', postcode);
    I.click('.continue');
  },
);

Then(
  'I am presented with an postcode error {string}',
  async (message: string) => {
    I.seeElement('#postcode-error');
    const errorMessage = await I.grabTextFrom('#postcode-error');
    expect(errorMessage.includes('Error:')).equal(true);
    expect(
      errorMessage
        .replace(/[\n\r]+/g, '')
        .replace('Error:', '')
        .trim(),
    ).equal(message.trim());
  },
);
