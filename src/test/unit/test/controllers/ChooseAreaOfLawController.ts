import { mockRequest } from '../../utils/mockRequest';
import { mockResponse } from '../../utils/mockResponse';
import { PageData } from '../../../../main/interfaces/PageData';
import { ChooseAreaOfLawController } from '../../../../main/controllers/areaOfLaw/ChooseAreaOfLawController';
const expectedAreasOfLaw = require('../../../resources/areas-of-law-results.json');

const i18n = {
  'choose-area-of-law': {
    name: '',
    description: '',
  },
};

describe('Choose Area of Law Controller', () => {
  const response: any = { data: {} };
  const api: any = { court: async () => response.data };
  const controller = new ChooseAreaOfLawController(api);

  test('Should render the choose area page', async () => {
    response.data = expectedAreasOfLaw;
    const req = mockRequest(i18n);
    const res = mockResponse();
    await controller.get(req, res);

    const expectedData: PageData = {
      ...i18n['choose-area-of-law'],
      path: '/services',
      results: {
        ...response.data
      }
    };
    expect(res.render).toBeCalledWith('choose-area-of-law', expectedData);
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

  test('Should render Family Area of Law page if Family is selected', async () => {
    const req = mockRequest(i18n);
    req.body = {
      chooseAreaOfLaw: 'family',
    };
    const res = mockResponse();
    await controller.post(req, res);
    expect(res.redirect).toHaveBeenCalledWith('/service-area-probate-divorce-civil-partnerships');
  });

  test('Should render Childcare and Parenting Area of Law page if Childcare and parenting is selected', async () => {
    const req = mockRequest(i18n);
    req.body = {
      chooseAreaOfLaw: 'childcare-and-parenting',
    };
    const res = mockResponse();
    await controller.post(req, res);
    expect(res.redirect).toHaveBeenCalledWith('/service-area-childcare-parenting');
  });

});
