import { ServiceSearchResultsController } from '../../../../main/controllers/service/ServiceSearchResultsController';
import { mockRequest } from '../../utils/mockRequest';
import { mockResponse } from '../../utils/mockResponse';
import { cloneDeep } from 'lodash';

const i18n = {
  'service-results': {
    hint: 'We manage your service area applications at our central service centre.',
    nameOfCourt: 'court 1',
    slug: 'court-1',
    regionStatement: '',
    onlineText: 'Apply online',
    onlineUrl: 'Online url',
    results: {},
  },
};

describe('service search results controller', () => {
  const response: any = { ServiceAreaResult: {} };
  const api: any = {
    getServiceArea: async () => response.ServiceAreaResult,
  };
  const controller = new ServiceSearchResultsController(api);

  test('should render single service results', async () => {
    response.ServiceAreaResult = {
      name: 'service area',
      description: 'service area description',
      slug: 'service-area-slug',
      onlineText: 'Apply online',
      onlineUrl: 'Online url',
      text: null,
      serviceAreaCourts: [
        {
          name: 'court 1',
          slug: 'court-1',
          catchmentType: 'national',
        },
        {
          name: 'court 2',
          slug: 'court-2',
          catchmentType: 'local',
        },
      ],
    };

    const req = mockRequest(i18n);
    req.params = {
      hint: 'We manage your {service-area} applications at our central service centre.',
      nameOfCourt: '{court-name}',
      slug: '{slug}',
      onlineText: '{applyOnline}',
      onlineUrl: '{applyOnlineUrl}',
      service: 'service',
      serviceArea: 'service-area',
    };
    const res = mockResponse();
    await controller.get(req, res);
    const expectedData = {
      ...cloneDeep(i18n['service-results']),
    };

    expectedData.results = {
      name: 'court 1',
      slug: 'court-1',
      catchmentType: 'national',
    };

    expect(res.render).toBeCalledWith('service-results', expectedData);
  });
});
