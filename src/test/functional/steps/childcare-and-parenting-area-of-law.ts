import { Given, Then } from 'cucumber';
import * as I from '../utlis/puppeteer.util';
import { expect } from 'chai';

Then('I can select a {string} from the family and children area of law page', async (option: string) => {
  let element;
  switch(option) {
    case 'childcare': {
      element = '#childcare-arrangements-if-you-separate-from-your-partner';
      break;
    }
    case 'adoption': {
      element = '#adoption';
      break;
    }
    default: {
      element = '#not-listed';
      break;
    }
  }
  await I.click(element);
});

Given('I continue having not selected a family and children area of law option', async() => {
  await I.click('.govuk-button');
});

Then('I am presented with an error message for family and children area of law', async() => {
  const elementExist = await I.checkElement('#childcare-and-parenting-area-of-law-error');
  expect(elementExist).equal(true);
});
