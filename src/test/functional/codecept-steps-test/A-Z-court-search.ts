import {expect} from 'chai';
import { I } from '../utlis/codecept-util';


When('I select It is not listed here', async () => {
  const element = '#not-listed';
  await I.click(element);
  await I.click('button[class=\'govuk-button govuk-!-margin-top-2 govuk-!-margin-bottom-8 continue\']');
});

Given('I select I can not find what I am looking for', async function () {
  const element = '#not-listed';
  await I.click(element);
  await I.click('button[class=\'govuk-button govuk-!-margin-top-2 govuk-!-margin-bottom-8 continue\']');
});

When('I click on the link Search for a court by prefix \\(A - Z)', async function () {
  I.click('#main-content > div > div > p:nth-child(6) > a');
});

When('I click on the letter {string}', async (character: string) => {
  const charIndex = character.toUpperCase().charCodeAt(0) - 64;
  await I.click(`#alphabet-buttons > a:nth-child(${charIndex})`);
});

Then('I can see courts list all start with {string}', async (alphabet: string) => {
  const courtHtmlElement = await I.grabTextFromAll('#results-list > h2 > a');
  expect(courtHtmlElement.length > 0).equal(true);
  courtHtmlElement.forEach(courtName => expect(courtName.startsWith(alphabet)).equal(true));
  const sortedCourtNames = courtHtmlElement.sort();
  let isEqual = true;
  for (let i = 0; i < courtHtmlElement.length; ++i) {
    if (courtHtmlElement[i] === sortedCourtNames[i])
      isEqual = true;
    else {
      isEqual = false;
      break;
    }
  }
  expect(isEqual).equal(true);
});

Then('I am presented with message that no court found', async function () {
  await I.seeElement('#header-hint');
});

Then('I am presented with an empty results list', async () => {
  const [courtHtmlElement] = await Promise.all([I.grabTextFromAll('#results-list > h2 > a')]);
  expect(courtHtmlElement.length < 1).equal(true);
});

Then('I click on the first court in the results list', async () => {
  await I.click('#results-list > h2:nth-child(1) > a:nth-child(1)');
});
