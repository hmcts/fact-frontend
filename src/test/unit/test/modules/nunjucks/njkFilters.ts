import nunjucks from 'nunjucks';

import createFilters from '../../../../../main/modules/nunjucks/njkFilters';

describe('njkFilters', () => {
  let env: nunjucks.Environment;

  beforeEach(() => {
    env = new nunjucks.Environment();
    createFilters(env);
  });

  describe('Test the filter that appends a hidden warning to links that open new tabs', () => {
    test('should add hidden "opens in a new tab" text to link that contains target="_blank"', () => {
      const warningAppenderFilter = env.getFilter('warningAppender');
      const input =
        '<a href="https://www.gov.uk/government/news/scammers-using-hmcts-telephone-numbers" ' +
        'target="_blank">Hello</a>';
      const expectedOutput =
        '<a href="https://www.gov.uk/government/news/scammers-using-hmcts-telephone-numbers" ' +
        'target="_blank">Hello<span class=govuk-visually-hidden> - opens in a new tab</span></a>';

      expect(warningAppenderFilter(input)).toEqual(expectedOutput);
    });

    test('should add hidden "opens in a new tab" text to link that contains target="_blank" plus other attributes', () => {
      const warningAppenderFilter = env.getFilter('warningAppender');
      const input =
        '<a href="https://www.gov.uk/government/news" target="_blank" rel="noopener">I open in a new tab</a>';
      const expectedOutput =
        '<a href="https://www.gov.uk/government/news" target="_blank" rel="noopener">I open in a new tab<span class=govuk-visually-hidden> - opens in a new tab</span></a>';

      expect(warningAppenderFilter(input)).toEqual(expectedOutput);
    });

    test.each(["'_blank'", "'_new'"])(
      'should add hidden "opens in a new tab" text to link text where the target value is wrapped in single quotes',
      (targetValue) => {
        const warningAppenderFilter = env.getFilter('warningAppender');
        const input =
          '<a href="https://www.gov.uk/government/news" title="link" target=' +
          targetValue +
          ' rel="noopener">I open in a new tab</a>';
        const expectedOutput =
          '<a href="https://www.gov.uk/government/news" title="link" target=' +
          targetValue +
          ' rel="noopener">I open in a new tab<span class=govuk-visually-hidden> - opens in a new tab</span></a>';

        expect(warningAppenderFilter(input)).toEqual(expectedOutput);
      },
    );

    test('should not add hidden "opens in a new tab" text when link does not open in a new tab', () => {
      const warningAppenderFilter = env.getFilter('warningAppender');
      const input =
        '<a href="https://www.gov.uk/government/news" rel="noopener">I stay in the same tab</a>';
      const expectedOutput =
        '<a href="https://www.gov.uk/government/news" rel="noopener">I stay in the same tab</a>';

      expect(warningAppenderFilter(input)).toEqual(expectedOutput);
    });

    test('should handle being passed an empty string', () => {
      const warningAppenderFilter = env.getFilter('warningAppender');
      const input = '';
      const expectedOutput = '';

      expect(warningAppenderFilter(input)).toEqual(expectedOutput);
    });

    test('should not add hidden "opens in a new tab" text when string is not a link', () => {
      const warningAppenderFilter = env.getFilter('warningAppender');
      const input = '<p target="_blank>" This is not a link</p>';
      const expectedOutput = '<p target="_blank>" This is not a link</p>';

      expect(warningAppenderFilter(input)).toEqual(expectedOutput);
    });

    test.each(['"_blank"', '"_new"'])(
      'should add hidden "opens in a new tab" to link text ' +
        'when target value is %j and link is surrounded by other text',
      (targetValue) => {
        const warningAppenderFilter = env.getFilter('warningAppender');
        const input =
          'Please make sure to visit this site to learn new information -> <a href="https://www.gov.uk/government/news" ' +
          'rel="noopener" target=' +
          targetValue +
          '>Gov UK</a>. It has a lot of stuff to learn about';
        const expectedOutput =
          'Please make sure to visit this site to learn new information -> <a href="https://www.gov.uk/government/news" ' +
          'rel="noopener" target=' +
          targetValue +
          '>Gov UK<span class=govuk-visually-hidden> - opens in a new tab</span></a>. It has a lot of stuff to learn about';

        expect(warningAppenderFilter(input)).toEqual(expectedOutput);
      },
    );

    test.each(['"_blank"', '"_new"'])(
      'should add hidden "opens in a new tab" to each link text ' +
        'when there are multiple links that open new tabs',
      (targetValue) => {
        const warningAppenderFilter = env.getFilter('warningAppender');
        const input =
          'Please make sure to visit this site to learn new information -> <a href="https://www.gov.uk/government/news" ' +
          'rel="noopener" target=' +
          targetValue +
          '>Gov UK</a>. It has a lot of stuff to learn about. Please also take a ' +
          'look at this site as well <a href="https://www.gov.uk/government/news/information" ' +
          'rel="noopener" target=' +
          targetValue +
          '>Gov UK Info</a>';
        const expectedOutput =
          'Please make sure to visit this site to learn new information -> <a href="https://www.gov.uk/government/news" ' +
          'rel="noopener" target=' +
          targetValue +
          '>Gov UK<span class=govuk-visually-hidden> - opens in a new tab</span></a>. It has a lot of stuff to learn about. Please also take a ' +
          'look at this site as well <a href="https://www.gov.uk/government/news/information" ' +
          'rel="noopener" target=' +
          targetValue +
          '>Gov UK Info<span class=govuk-visually-hidden> - opens in a new tab</span></a>';

        expect(warningAppenderFilter(input)).toEqual(expectedOutput);
      },
    );

    test.each(['"_blank"', '"_new"'])(
      'should add hidden "opens in a new tab" to link text ' +
        'when link text contains special characters',
      (targetValue) => {
        const warningAppenderFilter = env.getFilter('warningAppender');
        const input =
          '<a href="https://www.gov.uk/government/news" ' +
          'rel="noopener" target=' +
          targetValue +
          '><strong>Gov<strong> UK &amp;</a>.';
        const expectedOutput =
          '<a href="https://www.gov.uk/government/news" ' +
          'rel="noopener" target=' +
          targetValue +
          '><strong>Gov<strong> UK &amp;<span class=govuk-visually-hidden> - opens in a new tab</span></a>.';

        expect(warningAppenderFilter(input)).toEqual(expectedOutput);
      },
    );

    test.each(['"_blank"', '"_new"'])(
      'should add hidden "opens in a new tab" to link text ' +
        'even if text already contains a new tab warning',
      (targetValue) => {
        const warningAppenderFilter = env.getFilter('warningAppender');
        const input =
          '<a href="https://www.gov.uk/government/news" ' +
          'rel="noopener" target=' +
          targetValue +
          '>Gov UK (opens in a new tab)</a>.';
        const expectedOutput =
          '<a href="https://www.gov.uk/government/news" ' +
          'rel="noopener" target=' +
          targetValue +
          '>Gov UK (opens in a new tab)<span class=govuk-visually-hidden> - opens in a new tab</span></a>.';

        expect(warningAppenderFilter(input)).toEqual(expectedOutput);
      },
    );
  });
});
