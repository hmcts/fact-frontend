import { expect } from 'chai';
import { I } from '../utlis/codecept-util';

Given('the results are displayed with distance', async () => {
  I.seeElement('.distance');
});

Given('any listed court entry can be selected via a hyperlink', async () => {
  I.seeElement('#search-results div > h2 > a');
});

Given('I can re-enter the postcode', async () => {
  I.seeElement('#postcode');
});

Then('I can see 10 nearest court result back', async () => {
  const courts = await I.grabNumberOfVisibleElements(
    '#search-results > div > div > h2 > a',
  );
  expect(courts).equal(10);
});

Then('I can see 1 nearest court result is back', async () => {
  const courts = await I.grabNumberOfVisibleElements('#search-result > h2 > a');
  expect(courts).equal(1);
});
