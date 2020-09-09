import { BeforeAll, AfterAll, After } from 'cucumber';
const scope = require('./scope');
import puppeteer from 'puppeteer';

BeforeAll(async () => {
  scope.browser = await puppeteer.launch();
});

After(async () => {
  if (scope.page && scope.page.currentPage) {
    scope.page.currentPage.close();
  }
});

AfterAll(async () => {
  if (scope.browser) {
    await scope.browser.close();
  }
});
