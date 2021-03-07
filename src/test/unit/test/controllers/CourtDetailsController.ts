import {PageData} from '../../../../main/interfaces/PageData';
import {mockRequest} from '../../utils/mockRequest';
import {mockResponse} from '../../utils/mockResponse';
import {CourtDetailsController} from '../../../../main/controllers/CourtDetailsController';

const expectedCourtDetails = require('../../../resources/court-details-results.json');
const expectedNotInPersonCourtDetails = require('../../../resources/not-in-person-court-details-results.json');

const i18n = {
  'court-details': {
    notInPersonP1: '',
    catchmentArea: {
      area1: '',
      area2: ''
    },
    title: '',
    seoMetadataDescription: '{courtName}'
  }
};

describe('CourtDetailsController', () => {
  const response = {
    data: expectedCourtDetails
  };
  const api: any = {court: async () => response.data};
  const controller = new CourtDetailsController(api);
  const nextFunction = jest.fn();

  test('Should render the court details page with results', async () => {
    const req = mockRequest(i18n);
    req.params = {
      slug: 'London'
    };
    req.hostname = 'testHost';
    const res = mockResponse();
    await controller.get(req, res, nextFunction);
    const expectedData: PageData = {
      ...i18n['court-details'],
      path: '/courts/London',
      results: {
        ...response.data,
        enquiries: {
          emails: [],
          sendDocumentsEmail: [],
          fax: [],
          phone: [],
          welshPhone: []
        }
      },
      seoMetadata: {
        '@context': 'https://schema.org',
        '@id': 'http://localhost:3100/courts/London',
        '@type': 'GovernmentOffice',
        'address': {
          '@type': 'PostalAddress',
          'addressCountry': 'GB',
          'addressLocality': 'London',
          'postalCode': 'B4 6DS',
        },
        'image': [
          'https://factaat.blob.core.windows.net/images/London',
        ],
        'name': 'London',
      },
      'seoMetadataDescription': 'London'
    };
    expect(res.render).toBeCalledWith('court-details/in-person-court', expectedData);
  });

  test('Should render the court details page with results with no imageurl', async () => {
    const req = mockRequest(i18n);
    req.params = {
      slug: 'London'
    };
    req.hostname = 'testHost';
    const res = mockResponse();
    response.data['image_file'] = null;
    await controller.get(req, res, nextFunction);
    const expectedData: PageData = {
      ...i18n['court-details'],
      path: '/courts/London',
      results: {
        ...response.data,
        'image_file': null,
        enquiries: {
          emails: [],
          sendDocumentsEmail: [],
          fax: [],
          phone: [],
          welshPhone: []
        }
      },
      seoMetadata: {
        '@context': 'https://schema.org',
        '@id': 'http://localhost:3100/courts/London',
        '@type': 'GovernmentOffice',
        'address': {
          '@type': 'PostalAddress',
          'addressCountry': 'GB',
          'addressLocality': 'London',
          'postalCode': 'B4 6DS',
        },
        'image': [
          'http://localhost:3100/public/assets/images/hmcts-logo.png',
        ],
        'name': 'London'
      },
      'seoMetadataDescription': 'London'
    };
    expect(res.render).toBeCalledWith('court-details/in-person-court', expectedData);
  });

  test('Should render the court details page for not in person', async () => {
    response.data = expectedNotInPersonCourtDetails;
    const req = mockRequest(i18n);
    req.params = {
      slug: 'Not-London'
    };
    req.hostname = 'testHost';
    const res = mockResponse();
    await controller.get(req, res, nextFunction);
    const expectedData: PageData = {
      ...i18n['court-details'],
      path: '/courts/Not-London',
      results: {
        ...response.data,
        enquiries: {
          emails: [],
          sendDocumentsEmail: [],
          fax: [],
          phone: [],
          welshPhone: []
        }
      },
      seoMetadata: {
        '@context': 'https://schema.org',
        '@id': 'http://localhost:3100/courts/Not-London',
        '@type': 'GovernmentOffice',
        'address': {
          '@type': 'PostalAddress',
          'addressCountry': 'GB',
          'addressLocality': 'London',
          'postalCode': 'B4 6DS',
        },
        'image': ['http://localhost:3100/public/assets/images/hmcts-logo.png',],
        'name': 'Not-London'
      },
      'seoMetadataDescription': 'Not-London'
    };
    expect(res.render).toBeCalledWith('court-details/not-in-person-court', expectedData);
  });

  test('Should render the court details page with no results for empty slug', async () => {
    const req = mockRequest(i18n);
    req.params = {
      slug: ''
    };
    const res = mockResponse();
    await controller.get(req, res, nextFunction);
    expect(nextFunction).toBeCalled();
  });

  test('Should render the court details page with no results for no court returned from api', async () => {
    response.data = '';
    const req = mockRequest(i18n);
    req.params = {
      slug: 'somewhere'
    };
    const res = mockResponse();
    await controller.get(req, res, nextFunction);
    expect(nextFunction).toBeCalled();
  });
});
