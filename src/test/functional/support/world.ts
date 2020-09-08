import { Builder, Capabilities } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';
import { path } from 'chromedriver';
import { setWorldConstructor } from 'cucumber';

const service = new chrome.ServiceBuilder(path).build();
chrome.setDefaultService(service);

const options = new chrome.Options();
options.addArguments('-headless');

function CustomWorld() {
  this.driver = new Builder()
    .forBrowser('chrome')
    .withCapabilities(Capabilities.chrome())
    .setChromeOptions(options)
    .build();
}

setWorldConstructor(CustomWorld);
