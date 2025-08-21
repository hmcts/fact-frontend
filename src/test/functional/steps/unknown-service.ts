import { config as testConfig } from '../../config';
import { expect } from 'chai';
import { I } from '../utlis/codecept-util';

Given('I am on service-not-found page', async function () {
  await I.amOnPage(testConfig.TEST_URL + '/services/service-not-found');
});

Then(
  'I expect the service-not-found page header to be {string}',
  async function (title: string) {
    const pageTitle = await I.grabTitle();
    expect(pageTitle).equal(title);
  },
);
