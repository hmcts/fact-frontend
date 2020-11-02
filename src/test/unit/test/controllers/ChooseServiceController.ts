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

  test('Should render the chosen service page when the chosen service is selected', async () => {
    const req = mockRequest(i18n);
    req.body = {
      chooseService: 'chosen-service',
    };
    const res = mockResponse();
    await controller.post(req, res);
    expect(res.redirect).toHaveBeenCalledWith('/services/chosen-service/service-areas');
  });

});
