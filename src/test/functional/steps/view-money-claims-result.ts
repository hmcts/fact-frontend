import { I } from '../utlis/codecept-util';

When('I select {string} category from the list of categories', async (option: string) => {
  I.click(option);
});

Then('I select an {string} of either send documents, get an application update or not listed', async (option: string) => {
  I.click(option);
});

Then('I can select that entry via the hyperlink', async () => {
  I.seeElement('#search-result > h2 > a');
});

Then('I can view the selected court or tribunal details', async function() {
  I.click('#search-result > h2 > a');
  I.seeElement('#not-in-person');
});
