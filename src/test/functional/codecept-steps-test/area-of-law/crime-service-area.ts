import { I } from '../../utlis/codecept-util';

Then('I can select a {string} from the crime service area page', async (option: string) => {
  let element;
  switch(option) {
    case 'minor': {
      element = '#minor-criminal-offences';
      break;
    }
    case 'major': {
      element = '#major-criminal-offences';
      break;
    }
    default: {
      element = '#not-listed';
      break;
    }
  }
  await I.click(element);
});

Given('I continue having not selected a crime service area option', async() => {
  await I.click('.continue');
});

