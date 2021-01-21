import './assets/scss/main.scss';
import {initAll} from 'govuk-frontend';

const cookieManager = require('../../node_modules/@dvsa/cookie-manager/cookie-manager.js');
cookieManager.init({
  'cookie-banner-id': 'cookie_banner',
  'cookie-banner-visibility-class': 'govuk-visually-hidden',
  'cookie-banner-visible-on-page-with-preference-form': false,
  'user-preference-cookie-name': 'fact-cookie-preferences',
  'user-preference-configuration-form-id': 'cm_user_preference_form',
  'user-preference-saved-callback': function () {
    const message = document.querySelector('.cookie-preference-success');
    message.style.display = 'block';
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  },

  'set-checkboxes-in-preference-form': true,
  'cookie-manifest': [
    {
      'category-name': 'essential',
      optional: false,
      cookies: [
        'i18next',
        'fact-cookie-preferences'
      ]
    },
    {
      'category-name': 'analytics',
      optional: true,
      cookies: [
        '_ga',
        '_gid',
        '_gat_UA-37377084-3'
      ]
    }
  ]
});
initAll();
