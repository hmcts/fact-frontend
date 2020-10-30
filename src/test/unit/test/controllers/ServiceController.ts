import { mockRequest } from '../../utils/mockRequest';
import { mockResponse } from '../../utils/mockResponse';
import { PageData } from '../../../../main/interfaces/PageData';
import { ChooseServiceAreaController } from '../../../../main/controllers/areaOfLaw/ChooseServiceAreaController';
const expectedMoneyServiceAreas = require('../../../resources/money-service-results.json');

const i18n = {
  'money-service': {
    name: '',
    description: '',
  },
};

describe('Service Controller', () => {
  const response: any = { data: {} };
  const api: any = { moneyAreaOfLaw: async () => response.data };
  const controller = new ChooseServiceAreaController(api);

  test('Should render the money service areas page', async () => {
    response.data = expectedMoneyServiceAreas;
    const req = mockRequest(i18n);
    const res = mockResponse();
    await controller.get(req, res);

    const expectedData: PageData = {
      ...i18n['money-service'],
      path: '/services/money/service-areas',
      results: response.data
    };
    expect(res.render).toBeCalledWith('money-service', expectedData);
  });

  test('Should render money Area of Law page with errors if no data has been entered', async () => {
    response.data = expectedMoneyServiceAreas;
    const req = mockRequest(i18n);
    req.body = {};
    const res = mockResponse();
    await controller.post(req, res);

    const expectedData: PageData = {
      ...i18n['money-service'],
      path: '/services/money/service-areas',
      results: response.data,
      errors: true
    };
    expect(res.render).toBeCalledWith('money-service', expectedData);
  });
});
