import { mockRequest } from '../../utils/mockRequest';
import { mockResponse } from '../../utils/mockResponse';
import { PageData } from '../../../../main/interfaces/PageData';
import { MoneyAreaOfLawController } from '../../../../main/controllers/areaOfLaw/MoneyAreaOfLawController';


const i18n = {
  'money-area-of-law': {},
};

describe('money Area of Law Controller', () => {
  const controller = new MoneyAreaOfLawController();

  test('Should render the money Area of Law page', async () => {
    const req = mockRequest(i18n);
    const res = mockResponse();
    await controller.get(req, res);
    expect(res.render).toBeCalledWith('money-area-of-law', i18n['money-area-of-law']);
  });

  test('Should render money Area of Law page with errors if no data has been entered', async () => {
    const req = mockRequest(i18n);
    req.body = {};
    const res = mockResponse();
    await controller.post(req, res);
    const expectedData: PageData = {
      ...i18n['money-area-of-law'],
      path: '/service-area-money',
      errors: true,
    };
    expect(res.render).toBeCalledWith('money-area-of-law', expectedData);
  });
});
