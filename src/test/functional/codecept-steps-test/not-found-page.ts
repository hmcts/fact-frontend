import { I } from '../utlis/codecept-util';
import { config as testConfig } from '../../config';

Given('I am on FACT not found page', async function() {
  await I.amOnPage(testConfig.TEST_URL + '/page-not-found');
});
