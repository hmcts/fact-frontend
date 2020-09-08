import seleniumWebdriver from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';
import { setWorldConstructor } from 'cucumber';

function CustomWorld() {
  this.driver = new seleniumWebdriver.Builder()
    .forBrowser('chrome')
    .setChromeOptions(new chrome.Options().headless())
    .build();
}

setWorldConstructor(CustomWorld);
