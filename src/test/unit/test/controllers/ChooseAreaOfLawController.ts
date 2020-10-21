import { mockRequest } from '../../utils/mockRequest';
import { mockResponse } from '../../utils/mockResponse';
import { PageData } from '../../../../main/interfaces/PageData';
import { ChooseAreaOfLawController } from '../../../../main/controllers/ChooseAreaOfLawController';

const i18n = {
  'choose-area-of-law': {},
};

describe('Choose Area of Law Controller', () => {
  const controller = new ChooseAreaOfLawController();

  test('Should render the choose area page', async () => {
    const req = mockRequest(i18n);
    const res = mockResponse();
    await controller.get(req, res);
    expect(res.render).toBeCalledWith('choose-area-of-law', i18n['choose-area-of-law']);
  });

  test('Should render Choose Area of Law page with errors if no data has been entered', async () => {
    const req = mockRequest(i18n);
    req.body = {};
    const res = mockResponse();
    await controller.post(req, res);
    const expectedData: PageData = {
      ...i18n['choose-area-of-law'],
      path: '/service-category',
      errors: true,
    };
    expect(res.render).toBeCalledWith('choose-area-of-law', expectedData);
  });

  //Todo add in tests for redirecting to correct page

});
