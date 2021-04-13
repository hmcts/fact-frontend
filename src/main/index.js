import './assets/scss/main.scss';
import {initAll} from 'govuk-frontend';

const cookieManager = require('@hmcts/cookie-manager');
const cookieBanner = document.querySelector('#cm-cookie-banner');
const cookieBannerDecision = cookieBanner.querySelector('.govuk-cookie-banner__decision');
const cookieBannerConfirmation = cookieBanner.querySelector('.govuk-cookie-banner__confirmation');

function cookieBannerAccept() {
  const confirmationMessage = cookieBannerConfirmation.querySelector('p');
  confirmationMessage.innerHTML = 'You’ve accepted additional cookies. ' + confirmationMessage.innerHTML;
}

function cookieBannerReject() {
  const confirmationMessage = cookieBannerConfirmation.querySelector('p');
  confirmationMessage.innerHTML = 'You’ve rejected additional cookies. ' + confirmationMessage.innerHTML;
}

function cookieBannerSaved() {
  cookieBannerDecision.hidden = true;
  cookieBannerConfirmation.hidden = false;
}

function preferenceFormSaved() {
  const message = document.querySelector('.cookie-preference-success');
  message.style.display = 'block';
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

function cookiePreferencesUpdated(cookieStatus) {
  const dataLayer = window.dataLayer || [];
  const gtag = window.gtag || function () { dataLayer.push(arguments); };
  const dtrum = window.dtrum;

  dataLayer.push({'event': 'cookies', 'preferences': cookieStatus});

  if(cookieStatus.analytics === 'on') {
    gtag('consent', 'update', { 'analytics_storage': 'granted' });
  } else {
    gtag('consent', 'update', { 'analytics_storage': 'denied' });
  }

  if(cookieStatus.apm === 'on') {
    dtrum.enable();
    dtrum.enableSessionReplay();
  } else {
    dtrum.disableSessionReplay();
    dtrum.disable();
  }
}

cookieManager.init({
  'user-preference-cookie-name': 'fact-cookie-preferences',
  'user-preference-saved-callback': cookiePreferencesUpdated,
  'preference-form-id': 'cm-preference-form',
  'preference-form-saved-callback': preferenceFormSaved,
  'set-checkboxes-in-preference-form': true,
  'cookie-banner-id': 'cm-cookie-banner',
  'cookie-banner-visible-on-page-with-preference-form': false,
  'cookie-banner-reject-callback': cookieBannerReject,
  'cookie-banner-accept-callback': cookieBannerAccept,
  'cookie-banner-saved-callback': cookieBannerSaved,
  'cookie-banner-auto-hide': false,
  'cookie-manifest': [
    {
      'category-name': 'essential',
      'optional': false,
      'cookies': [
        'i18next',
        'fact-cookie-preferences'
      ]
    },
    {
      'category-name': 'analytics',
      'optional': true,
      'cookies': [
        '_ga',
        '_gid',
        '_gat_UA-37377084-3'
      ]
    },
    {
      'category-name': 'apm',
      'optional': true,
      'cookies': [
        'dtCookie',
        'dtLatC',
        'dtPC',
        'dtSa',
        'rxVisitor',
        'rxvt'
      ]
    }
  ]
});
initAll();
