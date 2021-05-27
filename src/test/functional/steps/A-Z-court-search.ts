import { Given, When, Then } from 'cucumber';
import { expect } from 'chai';

import * as I from '../utlis/puppeteer.util';


When('I select It is not listed here', async () => {
  const element='#not-listed';
  const elementExist = await I.checkElement('#not-listed');
  expect(elementExist).equal(true);
  await I.click(element);
  await I.click('button[class=\'govuk-button govuk-!-margin-top-2 govuk-!-margin-bottom-8 continue\']');
});

Given('I selected I can not find what I am looking for', async function ()
{
  const element='#not-listed';
  const elementExist = await I.checkElement('#not-listed');
  expect(elementExist).equal(true);
  await I.click(element);
  await I.click('button[class=\'govuk-button govuk-!-margin-top-2 govuk-!-margin-bottom-8 continue\']');

});

When('I Click on the link Search for a court by prefix \\(a-z)',async function ()
{
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

Then('I can see courts list all start with Y', async function () {
  // How the data comes back. I.e the data we will check to determine if it's sorted or not
  const courtHtmlElement: [string] = await I.getHtmlFromElements('#courtList > h2 > a');
  expect(courtHtmlElement.length > 0).equal(true);
  courtHtmlElement.forEach(courtName => expect(courtName.startsWith('Y')).equal(true));
});

Then('I click on the letter with no courts eg X', async function () {
  const element = await I.getElement('body > div:nth-child(7) > main:nth-child(3) > div:nth-child(1) > div:nth-child(1) > a:nth-child(26)');
  const elementExist = await I.checkElementIsAnchor(element);
  expect(elementExist).equal(true);
  await I.click('body > div:nth-child(7) > main:nth-child(3) > div:nth-child(1) > div:nth-child(1) > a:nth-child(26)');
});

Then('I am presented with message that no court found', async function () {
  console.log('test');
});






