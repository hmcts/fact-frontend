import { Given, Then } from 'cucumber';

import * as I from '../../utlis/puppeteer.util';
import { expect } from 'chai';

Given('I continue having selected an {string} from that page', async (option: string) => {
  let element;
  switch(option) {
    case 'money': {
      element = '#Money';
      break;
    }
    case 'family': {
      element = '#Probate';
      break;
    }
    case 'childcare': {
      element = '#Childcare';
      break;
    }
    case 'harm': {
      element = '#Harm';
      break;
    }
    case 'immigration': {
      element = '#Immigration';
      break;
    }
    case 'crime': {
      element = '#Crime';
      break;
    }
    case 'high courts': {
      element = '#High';
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
