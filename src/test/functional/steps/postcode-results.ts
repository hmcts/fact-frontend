import { Given } from 'cucumber';
import { expect } from 'chai';

import * as I from '../utlis/puppeteer.util';

Given('the results are displayed with distance', async () => {
  const elementExist = await I.checkElement('#postcode-results');
  expect(elementExist).equal(true);
});

Given('the results are displayed with distance', async () => {
  const elementExist = await I.checkElement('#postcode');
  expect(elementExist).equal(true);
});

Given('I can re-enter the postcode', async () => {
  const elementExist = await I.checkElement('#postcode');
  expect(elementExist).equal(true);
});
