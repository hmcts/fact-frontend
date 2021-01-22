import { Then } from 'cucumber';
import * as I from '../../utlis/puppeteer.util';

Then('I can select a {string} from the family area of law page', async (option: string) => {
  let element;
  switch(option) {
    case 'probate': {
      element = '#probate';
      break;
    }
    case 'divorce': {
      element = '#divorce';
      break;
    }
    case 'civil partnership': {
      element = '#civil-partnership';
      break;
    }
    case 'forced marriage': {
      element = '#forced-marriage';
      break;
    }
    default: {
      element = '#not-listed';
      break;
    }
  }
  await I.click(element);
});

Then('I continue having not selected a family area of law option', async() => {
  await I.click('.continue');
});

Then('I can continue having selected that family area of law option', async () => {
  await I.click('.continue');
});
