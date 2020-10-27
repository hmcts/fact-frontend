import { fail } from 'assert';
import Axios from 'axios';
import { config } from '../config';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const pa11y = require('pa11y');
const axios = Axios.create({ baseURL: config.TEST_URL });

const startPage = '/';
const searchOptionPage = '/search-option';
const locationSearchPage = '/search';
const serviceChooseActionPage = '/service-choose-action';
const searchLocationLondon = '/search-for-location?search=London';
const courtDetailsInPerson = '/individual-location-pages/courts/birmingham-civil-and-family-justice-centre';
const courtDetailsMultipleAddress = '/individual-location-pages/courts/aylesbury-magistrates-court-and-family-court';
const courtDetailsNotInPerson = '/individual-location-pages/courts/north-west-regional-divorce-centre';
const courtDetailsUrgentMessage = '/individual-location-pages/courts/telford-county-court-and-family-court';
const courtDetailsNoAreaOfLaw = '/individual-location-pages/courts/tax-chamber-first-tier-tribunal';
const courtDetailsAdditionalInfo = '/individual-location-pages/courts/west-cumbria-courthouse';

class Pa11yResult {
  documentTitle: string;
  pageUrl: string;
  issues: PallyIssue[];
}

class PallyIssue {
  code: string;
  context: string;
  message: string;
  selector: string;
  type: string;
  typeCode: number;
}

beforeAll((done /* call it or remove it*/) => {
  done(); // calling it
});

function ensurePageCallWillSucceed(url: string): Promise<void> {
  return axios.get(url);
}

function runPallyWith(url: string, actions: string[]): Pa11yResult {
  return pa11y(config.TEST_URL + url, {
    hideElements: '.govuk-footer__licence-logo, .govuk-header__logotype-crown',
    actions: actions
  });
}

function expectNoErrors(messages: PallyIssue[]): void {
  const errors = messages.filter(m => m.type === 'error');
  if (errors.length > 0) {
    const errorsAsJson = `${JSON.stringify(errors, null, 2)}`;
    fail(`There are accessibility issues: \n${errorsAsJson}\n`);
  }
}

function testAccessibilityWithActions(url: string, actions: string[]): void {
  describe(`Page ${url}`, () => {
    test('should have no accessibility errors', done => {
      ensurePageCallWillSucceed(url)
        .then(() => runPallyWith(url, actions))
        .then((result: Pa11yResult) => {
          expectNoErrors(result.issues);
          done();
        })
        .catch((err: Error) => done(err));
    });
  });

}

function testAccessibility(url: string): void {
  testAccessibilityWithActions(url, []);
}

function testAccessibilityOfFormError(url: string) {
  testAccessibilityWithActions(url, [
    'click element .govuk-button'
  ]);
}

describe('Accessibility', () => {
  testAccessibility(startPage);

  testAccessibility(searchOptionPage);
  testAccessibilityOfFormError(searchOptionPage);

  testAccessibility(locationSearchPage);
  testAccessibilityOfFormError(locationSearchPage);
  testAccessibility(searchLocationLondon);
  testAccessibility(courtDetailsInPerson);
  testAccessibility(courtDetailsMultipleAddress);
  testAccessibility(courtDetailsNotInPerson);
  testAccessibility(courtDetailsNoAreaOfLaw);
  testAccessibility(courtDetailsUrgentMessage);
  testAccessibility(courtDetailsAdditionalInfo);

  testAccessibility(serviceChooseActionPage);
  testAccessibilityOfFormError(serviceChooseActionPage);
});
