
import { expect } from 'chai';
import { config as testConfig } from '../../config';
import { I } from '../utlis/codecept-util';
import Axios from 'axios';

Given('I am an API client', async function() {
  await I.amOnPage('/');
});

When('I make an API call to {string} and expect some JSON to be returned', async function(path: string) {
  const response =  await Axios.get(testConfig.TEST_URL + path);
  expect(response.headers['content-type']).equal('application/json');
  console.log('...........header.........' + response.headers['content-type']);
});

When('I make an API call to {string} and expect some header and slug {string} to be returned', async function(path: string,slug: string) {
  const response =  await Axios.get(testConfig.TEST_URL + path);
  console.log('...........header.........' + response.headers['content-type']);
  expect(response.headers['content-type']).equal('application/json; charset=utf-8');
  expect(response.status).equal(200);
  console.log('...........body.........' + response.data.slug);
  expect(response.data.slug).equal(slug);
});


// Given('I am an API client', async function() {
//   await I.newPage();
// });
//
// When('I make an API call to {string}', async function(path: string) {
//   await I.makeAnApiCallTo(config.TEST_URL + path);
// });
//
// Then('I expect some JSON to be returned', async function() {
//   const response = await I.getTheJsonResponse();
//   expect(response.headers['content-type']).equal('application/json');
// });
//
// Then('I expect some header to be returned', async function() {
//   const response = await I.getTheJsonResponse();
//   expect(response.headers['content-type']).equal('application/json; charset=utf-8');
//   expect(response.status).equal(200);
// });
//
// Then('I expect response data contains slug {string}', async function (slug: string) {
//   const response = await I.getTheJsonResponse();
//   expect(response.data.slug).equal(slug);
// });
