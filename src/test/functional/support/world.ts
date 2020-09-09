import webdriver from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';
import chromedriver from 'chromedriver';
import { setWorldConstructor } from 'cucumber';

const options = new chrome.Options();
options.addArguments('--headless');


function CustomWorld() {
  chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());

  this.driver = new webdriver.Builder()
    .forBrowser('chrome')
    .withCapabilities(webdriver.Capabilities.chrome())
    .setChromeOptions(new chrome.Options().addArguments('--headless'))
    .build();
}

setWorldConstructor(CustomWorld);
