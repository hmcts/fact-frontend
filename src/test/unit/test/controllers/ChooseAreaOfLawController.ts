import { mockRequest } from '../../utils/mockRequest';
import { mockResponse } from '../../utils/mockResponse';
import { PageData } from '../../../../main/interfaces/PageData';
import { ChooseAreaOfLawController } from '../../../../main/controllers/areaOfLaw/ChooseAreaOfLawController';

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

  test('Should render Money Area of Law page if Money is selected', async () => {
    const req = mockRequest(i18n);
    req.body = {
      chooseAreaOfLaw: 'money',
    };
    const res = mockResponse();
    await controller.post(req, res);
    expect(res.redirect).toHaveBeenCalledWith('/service-area-money');
  });

  test('Should render Family Area of Law page if Money is selected', async () => {
    const req = mockRequest(i18n);
    req.body = {
      chooseAreaOfLaw: 'family',
    };
    const res = mockResponse();
    await controller.post(req, res);
    expect(res.redirect).toHaveBeenCalledWith('/service-area-probate-divorce-civil-partnerships');
  });

});
