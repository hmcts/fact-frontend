import { fail } from 'assert';
import Axios from 'axios';
import { config } from '../config';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const pa11y = require('pa11y');
const axios = Axios.create({ baseURL: config.TEST_URL });

const startPage = '/';
const searchOptionPage = '/search-option';
const locationSearchPage = '/search-by-name';
const serviceChooseActionPage = '/service-choose-action';
const searchLocationLondon = '/courts?search=London';
const courtDetailsInPerson = '/courts/birmingham-civil-and-family-justice-centre';
const courtDetailsMultipleAddress = '/courts/aylesbury-magistrates-court-and-family-court';
const courtDetailsNotInPerson = '/courts/north-west-regional-divorce-centre';
const courtDetailsUrgentMessage = '/courts/telford-county-court-and-family-court';
const courtDetailsNoAreaOfLaw = '/courts/tax-chamber-first-tier-tribunal';
const courtDetailsAdditionalInfo = '/courts/west-cumbria-courthouse';
const unknownServicePage = '/services/service-not-found';
const services = '/services/update';
const serviceSearchAddress = '/search/address';
const serviceSearchCourtCode = '/search/courtcode';
const serviceSearchSpoe = '/search/spoe';
const servicesMoney = '/services/money/service-areas/update';
const servicesProbateDivorce = '/services/probate-divorce-or-ending-civil-partnerships/service-areas/update';
const servicesChildcare = '/services/childcare-and-parenting/service-areas/update';
const servicesHarmAbuse = '/services/harm-and-abuse/service-areas/update';
const servicesCrime = '/services/crime/service-areas/update';
const serviceSearchResultsMoneyClaims = '/services/money/money-claims/search-results';
const serviceSearchByNearestCourt = '/services/money/service-areas/nearest';
const serviceSearchByNearCourt = '/services/money/service-areas/nearest/courts/near';
const servicePostcodeSearchTax = '/services/money/tax/nearest/search-by-postcode';
const servicePostcodeResultsTax = '/services/money/tax/nearest/courts/near?postcode=E81DY';
const servicePostcodeResultsDivorce = '/services/probate-divorce-or-ending-civil-partnerships/divorce/nearest/courts/near?postcode=E81DY';
const servicePostcodeSearchMoneyClaims = '/services/money/money-claims/nearest/search-by-postcode';
const serviceSearchResultsProbate = '/services/probate-divorce-or-ending-civil-partnerships/probate/search-results';
const serviceSearchResultsMajorCriminalOffences = '/services/crime/major-criminal-offences/search-results';
const servicesSearchByPrefix = '/services/search-by-prefix';
const servicesSearchByPostcode = '/services/search-by-postcode';
const accessibilityStatement = '/accessibility-statement';
const cookies = '/cookies';
const individualLocationPages = '/individual-location-pages/courts/north-west-regional-divorce-centre';


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

async function runPallyWith(url: string, actions: string[]): Promise<Pa11yResult> {
  const result = await pa11y(config.TEST_URL + url, {
    hideElements: '.govuk-footer__licence-logo, .govuk-header__logotype-crown',
    actions: actions
  });

  // Extract only what we need to avoid circular references
  return {
    documentTitle: result.documentTitle,
    pageUrl: result.pageUrl,
    issues: result.issues.map((issue: PallyIssue) => ({
      code: issue.code,
      context: issue.context,
      message: issue.message,
      selector: issue.selector,
      type: issue.type,
      typeCode: issue.typeCode
    }))
  };
}

function expectNoErrors(issues: PallyIssue[]): void {
  const errors = issues.filter(m => m.type === 'error');

  if (errors.length > 0) {
    // Only extract the information we need
    const simplifiedErrors = errors.map(error => ({
      code: error.code,
      message: error.message,
      context: error.context,
      selector: error.selector,
      type: error.type
    }));

    const errorsAsJson = `${JSON.stringify(simplifiedErrors, null, 2)}`;
    fail(`There are accessibility issues: \n${errorsAsJson}\n`);
  }
}

function testAccessibilityWithActions(url: string, actions: string[]): void {
  describe(`Page ${url}`, () => {
    test('should have no accessibility errors', async () => {
      await ensurePageCallWillSucceed(url);
      const result = await runPallyWith(url, actions);
      expectNoErrors(result.issues);
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
  testAccessibility(unknownServicePage);
  testAccessibilityOfFormError(serviceChooseActionPage);

  testAccessibility(services);
  testAccessibilityOfFormError(services);
  testAccessibility(servicesMoney);
  testAccessibilityOfFormError(servicesMoney);
  testAccessibility(servicesProbateDivorce);
  testAccessibilityOfFormError(servicesProbateDivorce);
  testAccessibility(servicesChildcare);
  testAccessibilityOfFormError(servicesChildcare);
  testAccessibility(servicesHarmAbuse);
  testAccessibilityOfFormError(servicesHarmAbuse);
  testAccessibility(servicesCrime);
  testAccessibilityOfFormError(servicesCrime);
  testAccessibility(serviceSearchResultsMoneyClaims);
  testAccessibility(servicePostcodeSearchTax);
  testAccessibilityOfFormError(servicePostcodeSearchTax);
  testAccessibility(servicePostcodeResultsTax);
  testAccessibility(servicePostcodeResultsDivorce);
  testAccessibility(servicePostcodeSearchMoneyClaims);
  testAccessibilityOfFormError(servicePostcodeSearchMoneyClaims);
  testAccessibility(serviceSearchResultsProbate);
  testAccessibility(serviceSearchResultsMajorCriminalOffences);
  testAccessibility(accessibilityStatement);
  testAccessibility(cookies);
  testAccessibility(individualLocationPages);
  testAccessibility(servicesSearchByPrefix);
  testAccessibility(servicesSearchByPostcode);
  testAccessibility(serviceSearchByNearestCourt);
  testAccessibility(serviceSearchByNearCourt);
  testAccessibility(serviceSearchAddress);
  testAccessibility(serviceSearchCourtCode);
  testAccessibility(serviceSearchSpoe);
});
