import nunjucks from 'nunjucks';

function createFilters(env: nunjucks.Environment): void {
  env.addFilter('warningAppender', function (infoWithLinks: string) {
    return infoWithLinks.replace(
      /(<a\s+[^>]*target=['"]?(?:_blank|_new)['"]?[^>]*>)(.*?)(<\/a>)/gi, // Match anchor tags with target="_blank"
      (match: any, openingTag: any, linkText: any, closingTag) => `${openingTag}${linkText} (opens in new tab)${closingTag}`
    );

  });
}

export default createFilters;
