import { ServiceSearchResultsController } from '../../../../main/controllers/service/ServiceSearchResultsController';
import { mockRequest } from '../../utils/mockRequest';
import { mockResponse } from '../../utils/mockResponse';
import { cloneDeep } from 'lodash';

const i18n = {
  'service-results': {
    hint: 'We manage your {service-area} applications at our central service centre.',
    nameOfCourt: '{court-name}',
    slug: '{slug}',
    regionStatement: '',
    applyOnline: '{applyOnline}',
    applyOnlineUrl: '{applyOnlineUrl}'
  },
};

describe('service search results controller', () => {
  const response: any = { serviceData: {}, courtsInServiceAreasData: [] };
  const api: any = {
    getServiceArea: async () => response.serviceData,
    courtsInServiceAreas: async() => response.courtsInServiceAreasData
  };
  const controller = new ServiceSearchResultsController(api);

  test('should render single service results', async () => {
    response.courtsInServiceAreasData = [
      {
        name: 'court 1',
        slug: 'court-1',
        catchment: 'national'
      },
      {
        name: 'court 2',
        slug: 'court-2',
        catchment: 'local'
      }
    ];
    response.serviceData = {
      name: 'service area',
      description: 'service area description',
      slug: 'service-area-slug',
      applyOnline: 'apply online',
      applyOnlineUrl: 'apply online url'
    };
    const req = mockRequest(i18n);
    req.params = {
      hint: 'We manage your {service-area} applications at our central service centre.',
      nameOfCourt: '{court-name}',
      slug: '{slug}',
      applyOnline: '{applyOnline}',
      applyOnlineUrl: '{applyOnlineUrl}',
      service: 'service',
      serviceArea: 'service-area'
    };
    const res = mockResponse();
    await controller.get(req, res);
    const expectedData = {
      ...cloneDeep(i18n['service-results'])
    };
    expect(res.render).toBeCalledWith('service-results', expectedData);

  });
});
