import seleniumWebdriver from 'selenium-webdriver';
import firefox from 'selenium-webdriver/firefox';
import { setWorldConstructor } from 'cucumber';

function CustomWorld() {
  this.driver = new seleniumWebdriver.Builder()
    .forBrowser('firefox')
    .setFirefoxOptions(new firefox.Options().headless())
    .build();
}

setWorldConstructor(CustomWorld);
