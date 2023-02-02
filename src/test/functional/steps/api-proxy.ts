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

Then('I expect some header to be returned', async function() {
  const response = await I.getTheJsonResponse();
  expect(response.headers['content-type']).equal('application/json; charset=utf-8');
  expect(response.status).equal(200);
});

Then('I expect response data contains slug {string}', async function (slug: string) {
  const response = await I.getTheJsonResponse();
  expect(response.data.slug).equal(slug);
});

Then('I expect response data contains types {string} {string}', async function (courtType1: string, courtType2: string) {
  const response = await I.getTheJsonResponse();
  const courts : [] = response.data;
  const firstCourtsCourtTypes: string[] = response.data[0].types;
  const lastCourtsCourtTypes: string[] = response.data[courts.length - 1].types;

  expect((firstCourtsCourtTypes.filter(c => (c == courtType1 || c == courtType2))).length > 0).equal(true);
  expect((lastCourtsCourtTypes.filter(c => (c == courtType1 || c == courtType2))).length > 0).equal(true);
});

