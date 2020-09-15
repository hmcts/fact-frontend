const scope = require('../support/scope');

export const newPage = async () => {
  scope.page = await scope.browser.newPage();
};

export const goTo = async (url: string) => {
  await scope.page.goto(url);
};

export const getPageTitle = async () => {
  return await scope.page.title();
};

export const clickEl = async (selector: string) => {
  await Promise.all([
    scope.page.waitForNavigation({waitUntil: ['domcontentloaded', 'networkidle0']}),
    scope.page.click(selector),
  ]);
};

export const fillField = async (selector: string, value: string) => {
  await scope.page.$eval(selector, (el: any) => el.value = value);
};

export const checkElement = async (selector: string) => {
  try {
    await scope.page.waitForSelector(selector);
    return true;
  } catch (error) {
    console.log("The element didn't appear.");
    return false;
  }
};
