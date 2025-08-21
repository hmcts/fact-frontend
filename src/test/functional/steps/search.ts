import { I } from '../utlis/codecept-util';
import { expect } from 'chai';

Given('I navigate to the Search Page', async () => {
  I.click('.continue');
});

When('I select {string}', async (option: string) => {
  let element;
  switch (option) {
    case 'I have the name': {
      element = '#i-have-the-name';
      break;
    }
    case 'I do not have the name': {
      element = '#i-do-not-have-the-name';
      break;
    }
    // case 'search by postcode': {
    //   element = '#search-by-postcode';
    //   break;
    // }
  }
  await I.click(element);
  await I.click('.continue');
});

Then(
  'I can select the option to search for {string}',
  async (search: string) => {
    I.seeElement('#search');
  },
);

Given('I have entered {string} as search criteria', async (search: string) => {
  I.fillField('#search', search);
});

When(
  'I have selected to search for that court or tribunal name or address',
  async () => {
    I.click('.continue');
  },
);

Then(
  'all courts and tribunals are listed in sorting rules order where the entered content is within any name or address field where partial search content is sufficient',
  async () => {
    I.seeElement('#search-results');
  },
);

Given('any listed entry can be selected via a hyperlink', async () => {
  I.seeElement('#search-results > h2 > a');
});

Then(
  'all courts and tribunals are listed in sorting rules order where the entered content is within any name or address field where full search content is required',
  async () => {
    I.seeElement('#search-results');
  },
);

When('I have selected to search for that content', async () => {
  I.click('.continue');
});

Then(
  'all courts and tribunals within that full postcode location are listed',
  async () => {
    I.seeElement('#search-results');
  },
);

Given('those entries are listed in sorting rules order', async () => {
  I.seeElement('#search-results');
});

Then(
  'all courts and tribunals within that partial postcode location are listed',
  async () => {
    I.seeElement('#search-results');
  },
);

Given('I have not entered search content', async () => {
  I.seeElement('#search');
});

Then('I am presented with an error', async () => {
  I.seeElementInDOM('#search-error');
});

Given('there are no matching results', async () => {
  I.seeElement('#no-search-results');
});

Given('I am presented with a no matching results display', async () => {
  const text = await I.grabTextFrom('#no-search-results > p');
  expect(text).equal('There are no matching results.');
});

Given('I can re-enter search content', async () => {
  I.seeElement('#search');
});

Given('I can enter {string}', async (search: string) => {
  I.seeElement('#search');
  I.fillField('#search', search);
});

Given('I can select to search for that content', async () => {
  I.seeElement('.continue');
});
