import { I } from '../../utlis/codecept-util';

When('I select {string} from the areas of law page and continue', async (option: string) => {
  const element = option;
  await I.click(element);
  await I.click('.continue');
});

Then('I can select a {string} from the money area of law page', async (option: string) => {
  let element;
  switch(option) {
    case 'money claims': {
      element = '#money-claims';
      break;
    }
    case 'probate': {
      element = '#probate';
      break;
    }
    case 'housing': {
      element = '#housing';
      break;
    }
    case 'bankruptcy': {
      element = '#bankruptcy';
      break;
    }
    case 'benefits': {
      element = '#benefits';
      break;
    }
    case 'claims against employers': {
      element = '#claims-against-employers';
      break;
    }
    case 'tax': {
      element = '#tax';
      break;
    }
    case 'minor criminal offences': {
      element = '#minor-criminal-offences';
      break;
    }
    default: {
      element = '#not-listed';
      break;
    }
  }
  await I.click(element);
});

Given('I continue having not selected an money area of law option', async() => {
  await I.click('.continue');
});

Then('I am presented with an error message for service area', async() => {
  I.seeElement('#service-area-error');
});
