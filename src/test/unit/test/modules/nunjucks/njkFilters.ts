import nunjucks from 'nunjucks';

import createFilters from '../../../../../main/modules/nunjucks/njkFilters';

describe('njkFilters', () => {
  let env: nunjucks.Environment;

  beforeEach(() => {
    env = new nunjucks.Environment();
    createFilters(env);
  });

  describe('Test the filter that appends warning to links that open new tabs', () => {
    test('should add (opens new tab) text to link that contains target="_blank"', () => {
      const titleEnhanceFilter = env.getFilter('warningAppender');
      const input = '<a href="https://www.gov.uk/government/news/scammers-using-hmcts-telephone-numbers" ' +
        'target="_blank">Hello</a>';
      const expectedOutput
        = '<a href="https://www.gov.uk/government/news/scammers-using-hmcts-telephone-numbers" ' +
        'target="_blank">Hello (opens in new tab)</a>';

      expect(titleEnhanceFilter(input)).toEqual(expectedOutput);
    });

    test('should add (opens new tab) text to link that contains target="_blank" and other attributes', () => {
      const titleEnhanceFilter = env.getFilter('warningAppender');
      const input = '<a href="https://www.gov.uk/government/news" target="_blank" rel="noopener">I open in a new tab</a>';
      const expectedOutput
        = '<a href="https://www.gov.uk/government/news" target="_blank" rel="noopener">I open in a new tab (opens in new tab)</a>';

      expect(titleEnhanceFilter(input)).toEqual(expectedOutput);
    });

    test('should not add (opens new tab) text when link does not open in a new tab', () => {
      const titleEnhanceFilter = env.getFilter('warningAppender');
      const input
        = '<a href="https://www.gov.uk/government/news" rel="noopener">I stay in the same tab</a>';
      const expectedOutput
        = '<a href="https://www.gov.uk/government/news" rel="noopener">I stay in the same tab</a>';

      expect(titleEnhanceFilter(input)).toEqual(expectedOutput);
    });
  });
});
