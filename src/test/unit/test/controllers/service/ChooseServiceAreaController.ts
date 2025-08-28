import { mockRequest } from '../../../utils/mockRequest';
import { mockResponse } from '../../../utils/mockResponse';
import { PageData } from '../../../../../main/interfaces/PageData';
import { ChooseServiceAreaController } from '../../../../../main/controllers/service/ChooseServiceAreaController';
import { cloneDeep } from 'lodash';
import { ServiceAreaRedirect } from '../../../../../main/controllers/service/ServiceAreaRedirect';

const i18n = {
  service: {
    name: '',
    description: '',
    title: '',
    question: '',
    error: {
      text: ''
    },
    courtsManaging: 'Courts managing '
  },
};

describe('Choose service area controller', () => {
  const response: any = { data: {}, serviceData: {}, serviceAreaResults: {} };
  const mockLogger = {
    error: jest.fn(),
    info: jest.fn(),
    silly: jest.fn(),
    debug: jest.fn(),
    verbose: jest.fn(),
    warn: jest.fn(),
    log: jest.fn()
  };
  const api: any = {
    serviceAreas: async () => response.data,
    getService: async () => response.serviceData,
    getServiceArea: async () => response.serviceAreaResults,
  };
  const controller = new ChooseServiceAreaController(api, mockLogger, new ServiceAreaRedirect(mockLogger));

  test('Should render a service areas page', async () => {
    response.data = [{
      name: 'Service area',
      description: 'service area description',
    },
    {
      name: 'Service area 2',
      description: 'service area 2 description',
    }
    ];

    response.serviceData = {
      name: 'Service',
      description: 'service description',
      slug: 'slug',
    };

    const req = mockRequest(i18n);
    req.params = {
      service: 'chosen-service',
      action: 'documents',
    };
    const res = mockResponse();
    await controller.get(req, res);
    const expectedData: PageData = {
      ...cloneDeep(i18n.service),
      path: '/services/' + req.params.service + '/service-areas/' +req.params.action ,
      results: response.data,
      errors: false,
      seoMetadataDescription: 'Courts managing service description'
    };
    expect(res.render).toHaveBeenCalledWith('service', expectedData);
  });

  test('Should render a service area page with errors if no data has been entered', async () => {
    response.data = [{
      name: 'Service area',
      description: 'service area description',
    }];

    response.serviceData = {
      name: 'Service',
      description: 'service description',
      slug: 'slug',
    };

    const req = mockRequest(i18n);
    req.params = {
      service: 'chosen-service',
      action: 'documents',
    };
    req.body = {};
    const res = mockResponse();
    await controller.post(req, res);
    const expectedData: PageData = {
      ...cloneDeep(i18n.service),
      path: '/services/' + req.params.service + '/service-areas/' + req.params.action,
      results: response.data,
      errors: true,
      seoMetadataDescription: 'Courts managing service description'
    };
    expect(res.render).toBeCalledWith('service', expectedData);
  });

  test('Should redirect to single service page if service contains one service area', async () => {
    response.data = [{
      name: 'Service area',
      description: 'service area description',
      slug: 'service-area-slug'
    }];

    response.serviceData = {
      name: 'Service',
      description: 'service description',
      slug: 'slug',
    };

    const req = mockRequest(i18n);
    req.params = {
      service: 'chosen-service',
      action: 'documents',
    };

    response.serviceAreaResults = {
      name: 'Service area',
      description: 'service area description',
      slug: 'service-area-slug',
      onlineText: 'Apply online',
      onlineUrl: 'Online url',
      serviceAreaCourts: [
        {
          name: 'court',
          slug: 'court',
          catchmentType: 'national'
        }
      ]
    };

    const res = mockResponse();
    await controller.get(req, res);
    expect(res.redirect).toHaveBeenCalledWith('/services/' + req.params.service + '/' + req.body.serviceArea + '/search-results');
  });

  test('Should redirect to error page if a service area does not exist', async () => {
    response.data = [];
    const req = mockRequest(i18n);
    req.params = {
      service: 'chosen-service',
      action: 'action',
    };
    req.body = {};
    const res = mockResponse();
    await controller.post(req, res);

    expect(res.redirect).toHaveBeenCalledWith('/not-found');
  });

  test('Should redirect to service not found if service area selected is not listed', async () => {
    const req = mockRequest(i18n);
    req.params = {
      service: 'service',
      action: 'update'
    };
    req.body = {
      serviceArea: 'not-listed'
    };

    const res = mockResponse();
    await controller.post(req, res);
    expect(res.redirect).toHaveBeenCalledWith('/services/update');
  });

});
