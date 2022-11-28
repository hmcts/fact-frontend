import {PageData} from '../../../../main/interfaces/PageData';
import {mockRequest} from '../../utils/mockRequest';
import {mockResponse} from '../../utils/mockResponse';
import {CourtDetailsController} from '../../../../main/controllers/CourtDetailsController';
import {CourtDetailsData, CourtDetailsResult } from 'interfaces/CourtDetailsData';

const expectedCourtDetails = require('../../../resources/court-details-results.json');
const expectedCourtDetailsClosed = require('../../../resources/court-details-results-closed.json');
const expectedNotInPersonCourtDetails = require('../../../resources/not-in-person-court-details-results.json');
const expectedNotInPersonCourtDetailsWithSCIntro = require('../../../resources/not-in-person-court-details-results_with_sc_intro.json');

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

const i18nClosed = {
  'closed-court': {
    notInPersonP1: '',
    catchmentArea: {
      area1: '',
      area2: ''
    },
    seoMetadataDescription: '{courtName}',
    title: 'a court'
  }
};

const i18nWithNoScIntro = {
  'court-details': {
    notInPersonP1: 'intro para',
    catchmentArea: {
      area1: '',
      area2: ''
    },
    'service_centre': {
      'is_a_service_centre': true,
      'intro_paragraph': '',
      'intro_paragraph_cy': ''
    },
    title: '',
    seoMetadataDescription: '{courtName}'
  }
};

const i18nWithScIntro = {
  'court-details': {
    notInPersonP1: 'intro para',
    catchmentArea: {
      area1: '',
      area2: ''
    },
    'service_centre': {
      'is_a_service_centre': true,
      'intro_paragraph': 'intro para',
      'intro_paragraph_cy': 'intro para cy'
    },
    title: '',
    seoMetadataDescription: '{courtName}'
  }
};

const i18nWithScIntroCy = {
  'court-details': {
    notInPersonP1: 'intro para cy',
    catchmentArea: {
      area1: '',
      area2: ''
    },
    'service_centre': {
      'is_a_service_centre': true,
      'intro_paragraph': 'intro para',
      'intro_paragraph_cy': 'intro para cy'
    },
    title: '',
    seoMetadataDescription: '{courtName}'
  }
};

const courtDetails: CourtDetailsResult = {
  name: 'In Person Court',
  'in_person': true,
  slug: 'test-in-person-court',
  'image_file': 'http://example.com/test-image.png',
  addresses: [
    {
      'address_lines': ['1 Test Street'],
      town: 'Test Town',
      postcode: 'TE ST1'
    }
  ],
  catchment: '',
  info: '',
  open: false,
  directions: '',
  lat: 0,
  lon: 0,
  urgent_message: '',
  crown_location_code: 0,
  county_location_code: 0,
  magistrates_location_code: 0,
  family_location_code: 0,
  tribunal_location_code: 0,
  areas_of_law: [],
  types: [],
  emails: [],
  contacts: [],
  application_updates: [],
  opening_times: [],
  facilities: [],
  gbs: '',
  dx_number: [],
  service_area: [],
  additional_links: [],
  service_centre: undefined
};

const viewData: CourtDetailsData = {
  results: undefined,
  notInPersonP1: '',
  title: '',
  catchmentArea: {
    area1: '',
    area2: ''
  },
  path: ''
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

  test('Should cover notInPersonP1 with undefined service_centre', async () => {
    const req = mockRequest(i18n);
    controller.setNotInPersonP1(req, courtDetails, viewData);
    expect(viewData.notInPersonP1).toEqual('');
  });

  test('Should render the court details page for not in person with sc intro where intro is empty', async () => {
    response.data = expectedNotInPersonCourtDetailsWithSCIntro;

    const req = mockRequest(i18nWithNoScIntro);
    req.params = {
      slug: 'Not-London'
    };
    req.lng = 'en';
    req.hostname = 'testHost';
    const res = mockResponse();
    await controller.get(req, res, nextFunction);
    const expectedData: PageData = {
      ...i18nWithNoScIntro['court-details'],
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

  test('Should render the court details page for not in person with sc intro', async () => {
    response.data = expectedNotInPersonCourtDetailsWithSCIntro;

    const req = mockRequest(i18nWithScIntro);
    req.params = {
      slug: 'Not-London'
    };
    req.lng = 'en';
    req.hostname = 'testHost';
    const res = mockResponse();
    await controller.get(req, res, nextFunction);
    const expectedData: PageData = {
      ...i18nWithScIntro['court-details'],
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

  test('Should render the court details page for not in person with sc intro cy', async () => {
    response.data = expectedNotInPersonCourtDetailsWithSCIntro;

    const req = mockRequest(i18nWithScIntroCy);
    req.params = {
      slug: 'Not-London'
    };
    req.lng = 'cy';
    req.hostname = 'testHost';
    const res = mockResponse();
    await controller.get(req, res, nextFunction);
    const expectedData: PageData = {
      ...i18nWithScIntroCy['court-details'],
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

  test('Should render the court details page for a closed court', async () => {
    response.data = expectedCourtDetailsClosed;

    const req = mockRequest(i18nClosed);
    req.params = {
      slug: 'Not-London'
    };
    req.lng = 'cy';
    req.hostname = 'testHost';
    const res = mockResponse();
    await controller.get(req, res, nextFunction);
    const expectedData: PageData = {
      ...i18nClosed['closed-court'],
      path: '/courts/Not-London',
      'seoMetadataDescription': '{courtName}'
    };
    expect(res.render).toBeCalledWith('court-details/closed-court', expectedData);
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
