import nunjucks from 'nunjucks';

function createFilters(env: nunjucks.Environment): void {
  env.addFilter('warningAppender', function (infoWithLinks: string) {
    //This filter expects a string containing links (html anchor tags <a></a>). If the link suggests it would open a new
    //tab - by containing the target attribute with value _blank or _new - then this filter appends the hidden text opens in
    //tab to the link text.
    return infoWithLinks.replace(
      /(<a\s+[^>]*target=['"]?(?:_blank|_new)['"]?[^>]*>)(.*?)(<\/a>)/gi, // Match anchor tags with target="_blank"
      (match: any, openingTag: any, linkText: any, closingTag) => `${openingTag}${linkText}<span class=govuk-visually-hidden> - opens in a new tab</span>${closingTag}`
    );

  });
}

export default createFilters;
