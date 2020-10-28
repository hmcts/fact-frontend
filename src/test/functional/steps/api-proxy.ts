import { Given, Then, When } from 'cucumber';
import { expect } from 'chai';

import { config } from '../../config';
import * as I from '../utlis/puppeteer.util';

Given('I am an API client', async function() {
  await I.newPage();
});

When('I make an API call to {string}', async function(path: string) {
  await I.makeAnApiCallTo(config.TEST_URL + path);
});

Then('I expect some JSON to be returned', async function() {
  const response = await I.getTheJsonResponse();
  expect(response.headers['content-type']).equal('application/json');
});
