import {Given} from 'cucumber';

import * as I from '../utlis/puppeteer.util';

Given('I continue having selected an {string} from that page', async (option: string) => {
  let element;
  switch(option) {
    case 'money': {
      element = '#money';
      break;
    }
    case 'probate': {
      element = '#probate-and-divorce-and-ending-civil-partnerships';
      break;
    }
    case 'childcare': {
      element = '#childcare-and-parenting';
      break;
    }
    case 'harm': {
      element = '#harm-and-abuse';
      break;
    }
    case 'immigration': {
      element = '#immigration-and-asylum';
      break;
    }
    case 'crime': {
      element = '#crime';
      break;
    }
    case 'high courts': {
      element = '#high-courts';
      break;
    }
    default: {
      element = '#not-listed';
      break;
    }
  }
  await I.click(element);
});

Given('I continue having not selected an area of law option', async() => {
  await I.click('.govuk-button');
});
