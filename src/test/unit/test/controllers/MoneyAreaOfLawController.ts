import { mockRequest } from '../../utils/mockRequest';
import { mockResponse } from '../../utils/mockResponse';
import { PageData } from '../../../../main/interfaces/PageData';
import { MoneyAreaOfLawController } from '../../../../main/controllers/areaOfLaw/MoneyAreaOfLawController';
const expectedMoneyAreaOfLaw = require('../../../resources/money-area-of-law-results.json');

const i18n = {
  'money-area-of-law': {
    name: '',
    description: '',
  },
};

describe('money Area of Law Controller', () => {
  const response: any = { data: {} };
  const api: any = { moneyAreaOfLaw: async () => response.data };
  const controller = new MoneyAreaOfLawController(api);

  test('Should render the money Area of Law page', async () => {
    response.data = expectedMoneyAreaOfLaw;
    const req = mockRequest(i18n);
    const res = mockResponse();
    await controller.get(req, res);

    const expectedData: PageData = {
      ...i18n['money-area-of-law'],
      path: '/services/money/service-areas',
      results: response.data
    };
    expect(res.render).toBeCalledWith('money-area-of-law', expectedData);
  });

  test('Should render money Area of Law page with errors if no data has been entered', async () => {
    response.data = expectedMoneyAreaOfLaw;
    const req = mockRequest(i18n);
    req.body = {};
    const res = mockResponse();
    await controller.post(req, res);

    const expectedData: PageData = {
      ...i18n['money-area-of-law'],
      path: '/services/money/service-areas',
      results: response.data,
      errors: true
    };
    expect(res.render).toBeCalledWith('money-area-of-law', expectedData);
  });
});
