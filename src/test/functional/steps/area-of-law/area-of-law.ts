import { I } from '../../utlis/codecept-util';
//import {expect} from "@playwright/test";
import { expect } from 'chai';

Given(
  'I continue having selected an {string} from that page',
  async (option: string) => {
    let element;
    switch (option) {
      case 'money': {
        element = '#money';
        break;
      }
      case 'family': {
        element = '#probate-divorce-or-ending-civil-partnerships';
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
        element = '#high-court-district-registries';
        break;
      }
      default: {
        element = '#not-listed';
        break;
      }
    }
    I.click(element);
  },
);

Given('I continue having not selected an area of law option', async () => {
  I.click('.continue');
});

Then('I am presented with an error message for services', async () => {
  I.seeElement('#choose-service-error');
});
