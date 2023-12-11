
import { expect } from 'chai';
import { config as testConfig } from '../../config';
import { I } from '../utlis/codecept-util';
import Axios from 'axios';

Given('I am an API client', async function() {
  I.amOnPage('/');
});

When('I make an API call to {string} and expect some JSON to be returned', async function(path: string) {
  const response =  await Axios.get(testConfig.TEST_URL + path);
  expect(response.headers['content-type']).equal('application/json');
});

When('I make an API call to {string} and expect some header and slug {string} to be returned', async function(path: string,slug: string) {
  const response =  await Axios.get(testConfig.TEST_URL + path);
  expect(response.headers['content-type']).equal('application/json');
  expect(response.status).equal(200);
  expect(response.data.slug).equal(slug);
});
