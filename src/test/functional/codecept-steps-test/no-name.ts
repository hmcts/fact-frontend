import {expect} from "chai";
import { I } from '../utlis/codecept-util'

Then('I am presented with the {string} page', async function(title: string) {
  const pageTitle = await I.grabTitle();
  expect(pageTitle).equal(title);
});

Then('I can select an {string} option from the list displayed', async (option: string) => {
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
  await I.click('.continue');
});

Given('I continue having not selected a court option', async() => {
  await I.click('.continue');
});

Then('I am presented with an error message', async() => {
  I.seeElement('#choose-action-error');
});

