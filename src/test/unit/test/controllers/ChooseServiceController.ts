import { mockRequest } from '../../utils/mockRequest';
import { mockResponse } from '../../utils/mockResponse';
import { PageData } from '../../../../main/interfaces/PageData';
import { ChooseServiceController } from '../../../../main/controllers/service/ChooseServiceController';
import { cloneDeep } from 'lodash';
const expectedAreasOfLaw = require('../../../resources/service-results.json');

const i18n = {
  'choose-service': {
    name: '',
    description: '',
  },
};

describe('Choose service controller', () => {
  const response: any = { data: {} };
  const api: any = { services: async () => response.data };
  const controller = new ChooseServiceController(api);

  test('Should render the choose area page', async () => {
    response.data = expectedAreasOfLaw;
    const req = mockRequest(i18n);
    const res = mockResponse();
    await controller.get(req, res);

    const expectedData: PageData = {
      ...cloneDeep(i18n['choose-service']),
      path: '/services',
      results: response.data,
      errors: false,
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
      ...cloneDeep(i18n['choose-service']),
      path: '/services',
      results: response.data,
      errors: true
    };
    expect(res.render).toBeCalledWith('choose-service', expectedData);
  });

  test('Should render Choose Service page with errors if empty api data returned', async () => {
    response.data = [];
    const req = mockRequest(i18n);
    req.body = {};
    const res = mockResponse();
    await controller.post(req, res);

    const expectedData: PageData = {
      ...cloneDeep(i18n['choose-service']),
      path: '/services',
      results: response.data,
      errors: true
    };
    expect(res.render).toBeCalledWith('choose-service', expectedData);
  });

  test('Should render Money Service page if Money is selected', async () => {
    const req = mockRequest(i18n);
    req.body = {
      chooseService: 'serviceChosen1',
    };
    const res = mockResponse();
    await controller.post(req, res);
    expect(res.redirect).toHaveBeenCalledWith('/services/Money/service-areas');
  });

  test('Should render Family Service page if Family is selected', async () => {
    const req = mockRequest(i18n);
    req.body = {
      chooseService: 'serviceChosen2',
    };
    const res = mockResponse();
    await controller.post(req, res);
    expect(res.redirect).toHaveBeenCalledWith('/services/Probate, divorce or ending civil partnerships/service-areas');
  });

  test('Should render Childcare and Parenting Service page if Childcare and parenting is selected', async () => {
    const req = mockRequest(i18n);
    req.body = {
      chooseService: 'serviceChosen3',
    };
    const res = mockResponse();
    await controller.post(req, res);
    expect(res.redirect).toHaveBeenCalledWith('/services/Childcare and parenting/service-areas');
  });

  test('Should render Harm and Abuse Service page if harm and abuse is selected', async () => {
    const req = mockRequest(i18n);
    req.body = {
      chooseService: 'serviceChosen4',
    };
    const res = mockResponse();
    await controller.post(req, res);
    expect(res.redirect).toHaveBeenCalledWith('/services/Harm and abuse/service-areas');
  });

  test('Should render Crime Service page if crime is selected', async () => {
    const req = mockRequest(i18n);
    req.body = {
      chooseService: 'serviceChosen6',
    };
    const res = mockResponse();
    await controller.post(req, res);
    expect(res.redirect).toHaveBeenCalledWith('/services/Crime/service-areas');
  });


});
