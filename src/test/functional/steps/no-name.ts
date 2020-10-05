import {Given, Then} from 'cucumber';
import { expect } from 'chai';

import * as I from '../utlis/puppeteer.util';

Then('I can select a {string} option from the list displayed', async (option: string) => {
  let element;
  switch(option) {
    case 'nearest court': {
      element = '#nearest-court';
      break;
    }
    case 'document court': {
      element = '#document-court';
      break;
    }
    case 'update court': {
      element = '#update-court';
      break;
    }
    default: {
      element = '#not-listed';
      break;
    }
  }
  await I.click(element);
});

Given('I can continue having selected that option', async () => {
  await I.click('.govuk-button');
});

Given('I continue having not selected a court option', async() => {
  await I.click('.govuk-button');
});

Then('I am presented with an error message', async() => {
  const elementExist = await I.checkElement('#option-error');
  expect(elementExist).equal(true);
});

