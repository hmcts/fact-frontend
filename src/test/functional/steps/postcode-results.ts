import { Given } from 'cucumber';
import { expect } from 'chai';

import * as I from '../utlis/puppeteer.util';

Given('the results are displayed with distance', async () => {
  const elementExist = await I.checkElement('.distance');
  expect(elementExist).equal(true);
});

Given('any listed court entry can be selected via a hyperlink', async () => {
  const element = await I.getElement('#search-results div > h2 > a');
  const elementExist = await I.checkElementIsAnchor(element);
  expect(elementExist).equal(true);
});

Given('I can re-enter the postcode', async () => {
  const elementExist = await I.checkElement('#postcode');
  expect(elementExist).equal(true);
});
