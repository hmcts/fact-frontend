import { PageData } from '../../../../main/interfaces/PageData';
import { mockRequest } from '../../utils/mockRequest';
import { mockResponse } from '../../utils/mockResponse';
import { CourtDetailsController } from '../../../../main/controllers/CourtDetailsController';

const i18n = {
  'court-details': {}
};

describe('CourtDetailsController', () => {
  const response: any = { data: [] };
  const api: any = { court: async () => response.data };
  const controller = new CourtDetailsController(api);

  test('Should render the court details page with results', async () => {
    response.data = [{
      name: 'London',
      slug: 'London',
      address: 'Address Street',
      'townName': 'AAA',
      postcode: 'AAA AAA',
    }];
    const req = mockRequest(i18n);
    req.params = {
      slug: 'London'
    };
    const res = mockResponse();
    await controller.get(req, res);
    const expectedData: PageData = {
      ...i18n['court-details'],
      path: '/individual-location-pages/courts',
      results: response.data,
      errors: false
    };
    expect(res.render).toBeCalledWith('court-details', expectedData);
  });

  test('Should render the court details page with no results', async () => {
    const req = mockRequest(i18n);
    req.params = {
      slug: ''
    };
    const res = mockResponse();
    await controller.get(req, res);
    const expectedData: PageData = {
      ...i18n['court-details'],
      path: '/individual-location-pages/courts',
      results: [],
      errors: true
    };
    expect(res.render).toBeCalledWith('court-details', expectedData);
  });
});
