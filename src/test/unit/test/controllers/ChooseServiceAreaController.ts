import { mockRequest } from '../../utils/mockRequest';
import { mockResponse } from '../../utils/mockResponse';
import { PageData } from '../../../../main/interfaces/PageData';
import { ChooseServiceAreaController } from '../../../../main/controllers/service/ChooseServiceAreaController';
import { cloneDeep } from 'lodash';

const i18n = {
  service: {
    name: '',
    description: '',
    title: '',
    question: '',
    error: {
      text: ''
    },
  },
};

describe('Choose service area controller', () => {
  const response: any = { data: {}, serviceData: {}, serviceAreaResults: {} };
  const api: any = {
    serviceAreas: async () => response.data,
    getService: async () => response.serviceData,
    getServiceArea: async () => response.serviceAreaResults,
  };
  const controller = new ChooseServiceAreaController(api);

  test('Should redirect to search results if action is update and service area has a national centre ', async () => {
    const req = mockRequest(i18n);
    req.params = {
      service: 'service',
      action: 'update'
    };
    req.body = {
      serviceArea: 'service-area'
    };
    response.serviceAreaResults = {
      name: 'service area',
      description: 'service area description',
      slug: 'service-area-slug',
      onlineText: 'Apply online',
      onlineUrl: 'Online url',
      serviceAreaCourts: [
        {
          name: 'court 1',
          slug: 'court-1',
          catchmentType: 'national'
        },
        {
          name: 'court 2',
          slug: 'court-2',
          catchmentType: 'local'
        }
      ]
    };
    const res = mockResponse();
    await controller.post(req, res);
    expect(res.redirect).toHaveBeenCalledWith('/services/' + req.params.service + '/' + req.body.serviceArea + '/search-results');
  });

  test('Should redirect to search results if action is documents and service area has a national centre and no regional centre', async () => {
    const req = mockRequest(i18n);
    req.params = {
      service: 'service',
      action: 'documents'
    };
    req.body = {
      serviceArea: 'service-area'
    };
    response.serviceAreaResults = {
      name: 'service area',
      description: 'service area description',
      slug: 'service-area-slug',
      onlineText: 'Apply online',
      onlineUrl: 'Online url',
      serviceAreaCourts: [
        {
          name: 'court 1',
          slug: 'court-1',
          catchmentType: 'national'
        },
        {
          name: 'court 2',
          slug: 'court-2',
          catchmentType: 'local'
        }
      ]
    };
    const res = mockResponse();
    await controller.post(req, res);
    expect(res.redirect).toHaveBeenCalledWith('/services/' + req.params.service + '/' + req.body.serviceArea + '/search-results');
  });

  test('Should render a service areas page', async () => {
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
      action: 'action',
    };
    const res = mockResponse();
    await controller.get(req, res);
    const expectedData: PageData = {
      ...cloneDeep(i18n.service),
      path: '/services/' + req.params.service + '/service-areas/' +req.params.action ,
      results: response.data,
      errors: false,
    };
    expect(res.render).toBeCalledWith('service', expectedData);
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
      action: 'action',
    };
    req.body = {};
    const res = mockResponse();
    await controller.post(req, res);

    const expectedData: PageData = {
      ...cloneDeep(i18n.service),
      path: '/services/' + req.params.service + '/service-areas/' +req.params.action,
      results: response.data,
      errors: true
    };
    expect(res.render).toBeCalledWith('service', expectedData);
  });

  test('Should redirect to a particular service area', async () => {
    response.data = [{
      name: 'Service area',
      description: 'service area description',
    }];
    const req = mockRequest(i18n);
    req.params = {
      service: 'chosen-service',
      action: 'action',
    };
    req.body = {
      serviceArea: 'chosen service area',
    };
    const res = mockResponse();
    await controller.post(req, res);

    expect(res.redirect).toHaveBeenCalledWith('/services/unknown-service');
  });

  test('Should render a service area page with errors if a service area does not exist', async () => {
    response.data = [];
    const req = mockRequest(i18n);
    req.params = {
      service: 'chosen-service',
      action: 'action',
    };
    req.body = {};
    const res = mockResponse();
    await controller.post(req, res);

    const expectedData: PageData = {
      ...cloneDeep(i18n.service),
      path: '/services/' + req.params.service + '/service-areas/' +req.params.action,
      results: response.data,
      errors: true
    };
    expect(res.render).toBeCalledWith('service', expectedData);
  });

  test('Should redirect to unknown service if service area selected is not listed', async () => {
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
    expect(res.redirect).toHaveBeenCalledWith('/services/unknown-service');
  });

  test('Should redirect to unknown service if no national court found', async () => {
    const req = mockRequest(i18n);
    req.params = {
      service: 'service',
      action: 'update'
    };
    req.body = {
      serviceArea: 'service-area'
    };
    response.serviceAreaResults = {
      name: 'service area',
      description: 'service area description',
      slug: 'service-area-slug',
      onlineText: 'Apply online',
      onlineUrl: 'Online url',
      serviceAreaCourts: [
        {
          name: 'court 1',
          slug: 'court-1',
          catchmentType: 'local'
        },
        {
          name: 'court 2',
          slug: 'court-2',
          catchmentType: 'local'
        }
      ]
    };
    const res = mockResponse();
    await controller.post(req, res);
    expect(res.redirect).toHaveBeenCalledWith('/services/unknown-service');
  });

  test('Should redirect to search results if action is documents and no regional court found', async () => {
    const req = mockRequest(i18n);
    req.params = {
      service: 'service',
      action: 'documents'
    };
    req.body = {
      serviceArea: 'service-area'
    };
    response.serviceAreaResults = {
      name: 'service area',
      description: 'service area description',
      slug: 'service-area-slug',
      onlineText: 'Apply online',
      onlineUrl: 'Online url',
      serviceAreaCourts: [
        {
          name: 'court 1',
          slug: 'court-1',
          catchmentType: 'national'
        },
        {
          name: 'court 2',
          slug: 'court-2',
          catchmentType: 'local'
        }
      ]
    };
    const res = mockResponse();
    await controller.post(req, res);
    expect(res.redirect).toHaveBeenCalledWith('/services/' + req.params.service + '/' + req.body.serviceArea + '/search-results');
  });

});
