import { Given, Then } from 'cucumber';

import * as I from '../../utlis/puppeteer.util';
import { expect } from 'chai';

Given('I continue having selected an {string} from that page', async (option: string) => {
  let element;
  switch(option) {
    case 'money': {
      element = '#money';
      break;
    }
    case 'family': {
      element = '#probate-and-divorce-and-ending-civil-partnerships';
      break;
    }
    case 'childcare': {
      element = '#childcare-and-parenting';
      break;
    }
    case 'harm': {
      element = '#harm-and-abuse';
      break;
    }
    case 'immigration': {
      element = '#immigration-and-asylum';
      break;
    }
    case 'crime': {
      element = '#crime';
      break;
    }
    case 'high courts': {
      element = '#high-courts';
      break;
    }
    default: {
      element = '#not-listed';
      break;
    }
  }
  await I.click(element);
});

Given('I continue having not selected an area of law option', async() => {
  await I.click('.govuk-button');
});

Then('I am presented with an error message for area of law', async() => {
  const elementExist = await I.checkElement('#choose-area-of-law-error');
  expect(elementExist).equal(true);
});
