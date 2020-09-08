import webdriver from 'selenium-webdriver';
import firefox from 'selenium-webdriver/firefox';
import { setWorldConstructor } from 'cucumber';

const options = new firefox.Options();
options.addArguments('-headless');

function CustomWorld() {
  this.driver = new webdriver.Builder()
    .forBrowser('firefox')
    .setFirefoxOptions(options)
    .build();
}

setWorldConstructor(CustomWorld);
