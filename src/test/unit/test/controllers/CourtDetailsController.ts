import { PageData } from '../../../../main/interfaces/PageData';
import { mockRequest } from '../../utils/mockRequest';
import { mockResponse } from '../../utils/mockResponse';
import { CourtDetailsController } from '../../../../main/controllers/CourtDetailsController';
const expectedCourtDetails = require('../../../resources/court-details-results.json');

const i18n = {
  'court-details': {
    notInPersonP1: '',
    catchmentArea: {
      area1: '',
      area2: ''
    }
  }
};

describe('CourtDetailsController', () => {
  const response: any = { data: {} };
  const api: any = { court: async () => response.data };
  const controller = new CourtDetailsController(api);

  test('Should render the court details page with results', async () => {
    response.data = expectedCourtDetails;
    const req = mockRequest(i18n);
    req.params = {
      slug: 'London'
    };
    const res = mockResponse();
    await controller.get(req, res);
    const expectedData: PageData = {
      ...i18n['court-details'],
      path: '/individual-location-pages/courts',
      results: {
        ...response.data,
        enquiries: {
          email: undefined,
          fax: undefined,
          phone: []
        }
      },
      errors: false,
    };
    expect(res.render).toBeCalledWith('court-details/in-person-court', expectedData);
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
    expect(res.render).toBeCalledWith('court-details/not-in-person-court', expectedData);
  });
});
