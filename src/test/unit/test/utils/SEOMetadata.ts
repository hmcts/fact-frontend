
import config from 'config';
import { generatePlaceMetadata } from '../../../../main/utils/SEOMetadata';
import {CourtDetailsResult} from '../../../../main/interfaces/CourtDetailsData';

describe('SEOMetadata', () => {
  describe('generateCourtMetadata', () => {
    test('Should return in-person-court SEO metadata object', async () => {
      const courtDetailsResult = {
        name: 'In Person Court',
        slug: 'test-in-person-court',
        'image_file': 'http://example.com/test-image.png',
        addresses: [
          {
            'address_lines': [ '1 Test Street' ],
            town: 'Test Town',
            postcode: 'TE ST1'
          }
        ]
      };

      const expectedResult = {
        '@context': 'https://schema.org',
        '@type': 'GovernmentOffice',
        '@id': config.get('services.frontend.url') + '/courts/test-in-person-court',
        image: ['http://example.com/test-image.png'],
        name: 'In Person Court',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '1 Test Street',
          addressLocality: 'Test Town',
          postalCode: 'TE ST1',
          addressCountry: 'GB'
        }
      };

      expect(generatePlaceMetadata(courtDetailsResult as CourtDetailsResult)).toEqual(expectedResult);
    });

    test('Should return non-in-person-court SEO metadata object', async () => {
      const courtDetailsResult = {
        name: 'Not In Person Court',
        slug: 'test-not-in-person-court',
        'image_file': '',
        addresses: [
          {
            'address_lines': [ 'HMCTS Service', 'PO BOX 000001' ],
            town: 'Test Town',
            postcode: 'TE ST1'
          }
        ]
      };

      const expectedResult = {
        '@context': 'https://schema.org',
        '@type': 'GovernmentOffice',
        '@id': config.get('services.frontend.url') + '/courts/test-not-in-person-court',
        image: [config.get('services.frontend.url') + '/public/assets/images/hmcts-logo.png'],
        name: 'Not In Person Court',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'HMCTS Service, PO BOX 000001',
          addressLocality: 'Test Town',
          postalCode: 'TE ST1',
          addressCountry: 'GB'
        }
      };

      expect(generatePlaceMetadata(courtDetailsResult as CourtDetailsResult)).toEqual(expectedResult);
    });

    test('Should return an empty object.', async () => {
      const courtDetailsResult = {};
      const expectedResult = {};

      expect(generatePlaceMetadata(courtDetailsResult as CourtDetailsResult)).toEqual(expectedResult);
    });
  });
});
