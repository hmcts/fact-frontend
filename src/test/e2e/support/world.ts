import seleniumWebdriver from 'selenium-webdriver';
import { setWorldConstructor } from 'cucumber';

function CustomWorld() {
  this.driver = new seleniumWebdriver.Builder()
    .forBrowser('chrome')
    .build();
}

setWorldConstructor(CustomWorld);
