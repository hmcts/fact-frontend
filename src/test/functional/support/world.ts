import webdriver from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';
import chromedriver from 'chromedriver';
import { setWorldConstructor } from 'cucumber';

const options = new chrome.Options();
options.addArguments('--headless');

chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());

function CustomWorld() {
  this.driver = new webdriver.Builder()
    .forBrowser('chrome')
    .withCapabilities(webdriver.Capabilities.chrome())
    .setChromeOptions(options)
    .build();
}

setWorldConstructor(CustomWorld);
