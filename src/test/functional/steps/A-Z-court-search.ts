import {Given, When, Then} from 'cucumber';
import {expect} from 'chai';

import * as I from '../utlis/puppeteer.util';


When('I select It is not listed here', async () => {
  const element = '#not-listed';
  const elementExist = await I.checkElement('#not-listed');
  expect(elementExist).equal(true);
  await I.click(element);
  await I.click('button[class=\'govuk-button govuk-!-margin-top-2 govuk-!-margin-bottom-8 continue\']');
});

Given('I selected I can not find what I am looking for', async function () {
  const element = '#not-listed';
  const elementExist = await I.checkElement('#not-listed');
  expect(elementExist).equal(true);
  await I.click(element);
  await I.click('button[class=\'govuk-button govuk-!-margin-top-2 govuk-!-margin-bottom-8 continue\']');
});

When('I Click on the link Search for a court by prefix \\(a-z)', async function () {
  const element = await I.getElement('body > div:nth-child(7) > main:nth-child(3) > div:nth-child(1) > div:nth-child(1) > p:nth-child(6) > a:nth-child(1)');
  const elementExist = await I.checkElementIsAnchor(element);
  expect(elementExist).equal(true);
  await I.click('body > div:nth-child(7) > main:nth-child(3) > div:nth-child(1) > div:nth-child(1) > p:nth-child(6) > a:nth-child(1)');
});

When('I clicked on alphabet Y', async function () {
  const element = await I.getElement('body > div:nth-child(7) > main:nth-child(3) > div:nth-child(1) > div:nth-child(1) > a:nth-child(27)');
  const elementExist = await I.checkElementIsAnchor(element);
  expect(elementExist).equal(true);
  await I.click('body > div:nth-child(7) > main:nth-child(3) > div:nth-child(1) > div:nth-child(1) > a:nth-child(27)');
});

Then('I can see courts list all start with {string}', async (alphabet: string) => {
  const courtHtmlElement: [string] = await I.getHtmlFromElements('#courtList > h2 > a');
  expect(courtHtmlElement.length > 0).equal(true);
  courtHtmlElement.forEach(courtName => expect(courtName.startsWith(alphabet)).equal(true));
  const sortedCourtNames: [string] = courtHtmlElement.sort();
  let isEqual = true;
  for (let i = 0; i < courtHtmlElement.length; ++i) {
    if (courtHtmlElement[i] === sortedCourtNames[i])
      isEqual = true;
    else
      isEqual = false;
  }
  expect(isEqual).equal(true);
});

Then('I click on the letter with no courts eg X', async function () {
  const element = await I.getElement('body > div:nth-child(7) > main:nth-child(3) > div:nth-child(1) > div:nth-child(1) > a:nth-child(26)');
  const elementExist = await I.checkElementIsAnchor(element);
  expect(elementExist).equal(true);
  await I.click('body > div:nth-child(7) > main:nth-child(3) > div:nth-child(1) > div:nth-child(1) > a:nth-child(26)');
  const courtHtmlElement: [string] = await I.getHtmlFromElements('#courtList > h2 > a');
  expect(courtHtmlElement.length < 1).equal(true);
});

Then('I am presented with message that no court found', async function () {
  const elementExist = await I.checkElement('#header-hint');
  expect(elementExist).equal(true);
});

When('I clicked on alphabet B then I click on first court in the list', async function () {
  const element = await I.getElement('a[href=\'search-by-prefix?prefix=B\']');
  const elementExist = await I.checkElementIsAnchor(element);
  expect(elementExist).equal(true);
  await I.click('a[href=\'search-by-prefix?prefix=B\']');
  await I.click('body > div:nth-child(7) > main:nth-child(3) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > h2:nth-child(1) > a:nth-child(1)');
});
