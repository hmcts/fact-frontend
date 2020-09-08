import { Builder } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';
import { setWorldConstructor } from 'cucumber';

const options = new chrome.Options();
options.addArguments('-headless');

function CustomWorld() {
  this.driver = new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();
}

setWorldConstructor(CustomWorld);
