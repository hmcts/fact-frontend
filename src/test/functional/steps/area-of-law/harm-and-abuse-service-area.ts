import { I } from '../../utlis/codecept-util';

Then('I can select a {string} from the harm and abuse service area page', async (option: string) => {
  let element;
  switch(option) {
    case 'domestic abuse ': {
      element = '#domestic-abuse ';
      break;
    }
    case 'female genital mutilation': {
      element = '#female-genital-mutilation';
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
  I.click(element);
});

Given('I continue having not selected a harm and abuse service area option', async() => {
  I.click('.continue');
});

