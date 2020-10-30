import { mockRequest } from '../../utils/mockRequest';
import { mockResponse } from '../../utils/mockResponse';
import { PageData } from '../../../../main/interfaces/PageData';
import { ChooseServiceController } from '../../../../main/controllers/service/ChooseServiceController';
const expectedAreasOfLaw = require('../../../resources/service-results.json');

const i18n = {
  'choose-service': {
    name: '',
    description: '',
  },
};

describe('Choose Service Controller', () => {
  const response: any = { data: {} };
  const api: any = { services: async () => response.data };
  const controller = new ChooseServiceController(api);

  test('Should render the choose area page', async () => {
    response.data = expectedAreasOfLaw;
    const req = mockRequest(i18n);
    const res = mockResponse();
    await controller.get(req, res);

    const expectedData: PageData = {
      ...i18n['choose-service'],
      path: '/services',
      results: response.data
    };
    expect(res.render).toBeCalledWith('choose-service', expectedData);
  });

  test('Should render Choose Service page with errors if no data has been entered', async () => {
    response.data = expectedAreasOfLaw;
    const req = mockRequest(i18n);
    req.body = {};
    const res = mockResponse();
    await controller.post(req, res);

    const expectedData: PageData = {
      ...i18n['choose-service'],
      path: '/services',
      results: response.data,
      errors: true
    };
    expect(res.render).toBeCalledWith('choose-service', expectedData);
  });

  test('Should render Money Service page if Money is selected', async () => {
    const req = mockRequest(i18n);
    req.body = {
      chooseService: 'money',
    };
    const res = mockResponse();
    await controller.post(req, res);
    expect(res.redirect).toHaveBeenCalledWith('/services/Money/service-areas');
  });

  test('Should render Family Service page if Family is selected', async () => {
    const req = mockRequest(i18n);
    req.body = {
      chooseService: 'probate-divorce-or-ending-civil-partnerships',
    };
    const res = mockResponse();
    await controller.post(req, res);
    expect(res.redirect).toHaveBeenCalledWith('/services/Probate, divorce or ending civil partnerships/service-areas');
  });

  test('Should render Childcare and Parenting Service page if Childcare and parenting is selected', async () => {
    const req = mockRequest(i18n);
    req.body = {
      chooseService: 'childcare-and-parenting',
    };
    const res = mockResponse();
    await controller.post(req, res);
    expect(res.redirect).toHaveBeenCalledWith('/services/Childcare and parenting/service-areas');
  });

  test('Should render Harm and Abuse Service page if harm and abuse is selected', async () => {
    const req = mockRequest(i18n);
    req.body = {
      chooseService: 'harm-and-abuse',
    };
    const res = mockResponse();
    await controller.post(req, res);
    expect(res.redirect).toHaveBeenCalledWith('/services/Harm and abuse/service-areas');
  });

  test('Should render Crime Service page if crime is selected', async () => {
    const req = mockRequest(i18n);
    req.body = {
      chooseService: 'crime',
    };
    const res = mockResponse();
    await controller.post(req, res);
    expect(res.redirect).toHaveBeenCalledWith('/services/Crime/service-areas');
  });


});
