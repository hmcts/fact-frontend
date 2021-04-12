import './assets/scss/main.scss';
import {initAll} from 'govuk-frontend';

const cookieManager = require('../../node_modules/@hmcts/fact-cookie-manager/cookie-manager.js');
const cookieBanner = document.querySelector('#cookie_banner');
const cookieBannerDecision = cookieBanner.querySelector('.govuk-cookie-banner__decision');
const cookieBannerConfirmation = cookieBanner.querySelector('.govuk-cookie-banner__confirmation');

function cookieBannerAccept() {
  const confirmationMessage = cookieBannerConfirmation.querySelector('p');
  confirmationMessage.innerHTML = 'You’ve accepted analytics cookies. ' + confirmationMessage.innerHTML;
}

function cookieBannerReject() {
  const confirmationMessage = cookieBannerConfirmation.querySelector('p');
  confirmationMessage.innerHTML = 'You’ve rejected analytics cookies. ' + confirmationMessage.innerHTML;
}

function cookieBannerSaved(cookieStatus) {
  cookieBannerDecision.hidden = true;
  cookieBannerConfirmation.hidden = false;
  cookiePreferencesUpdated(cookieStatus);
}

function preferenceFormSaved(cookieStatus) {
  const message = document.querySelector('.cookie-preference-success');
  message.style.display = 'block';
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

  cookiePreferencesUpdated(cookieStatus);
}

function cookiePreferencesUpdated(cookieStatus) {
  const dataLayer = window.dataLayer || [];
  const gtag = window.gtag || function () { dataLayer.push(arguments); };
  dataLayer.push({'event': 'cookies', 'preferences': cookieStatus});

  if(cookieStatus.analytics === 'on') {
    gtag('consent', 'update', { 'analytics_storage': 'granted' });
  } else {
    gtag('consent', 'update', { 'analytics_storage': 'denied' });
  }
}

cookieManager.init({
  'cookie-banner-id': 'cookie_banner',
  'cookie-banner-visible-on-page-with-preference-form': false,
  'user-preference-cookie-name': 'fact-cookie-preferences',
  'user-preference-configuration-form-id': 'cm_user_preference_form',
  'user-preference-saved-callback': preferenceFormSaved,
  'cookie-banner-reject-callback': cookieBannerReject,
  'cookie-banner-accept-callback': cookieBannerAccept,
  'cookie-banner-saved-callback': cookieBannerSaved,
  'set-checkboxes-in-preference-form': true,
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
    }
  ]
});
initAll();
