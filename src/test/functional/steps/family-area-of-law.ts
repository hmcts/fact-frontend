import { Given, Then } from 'cucumber';
import * as I from '../utlis/puppeteer.util';
import { expect } from 'chai';

Then('I can select a {string} from the family area of law page', async (option: string) => {
  let element;
  switch(option) {
    case 'probate': {
      element = '#probate';
      break;
    }
    case 'divorce': {
      element = '#divorce';
      break;
    }
    case 'civil partnership': {
      element = '#civil-partnership';
      break;
    }
    case 'forced marriage': {
      element = '#forced-marriage';
      break;
    }
    default: {
      element = '#not-listed';
      break;
    }
  }
  await I.click(element);
});

Then('I am presented with an error message for family area of law', async() => {
  const elementExist = await I.checkElement('#family-area-of-law-error');
  expect(elementExist).equal(true);
});

Given('I continue having not selected a family area of law option', async() => {
  await I.click('.govuk-button');
});
