import { ServicePostcodeSearchController } from '../../../../../main/controllers/service/ServicePostcodeSearchController';
import { mockRequest } from '../../../utils/mockRequest';
import { mockResponse } from '../../../utils/mockResponse';
import { PageData } from '../../../../../main/interfaces/PageData';

const i18n = {
  'postcode-search': {}
};

describe('Service Postcode Search Controller', () => {
  const controller = new ServicePostcodeSearchController();

  test('Should render the postcode search page', async () => {
    const req = mockRequest(i18n);
    const res = mockResponse();
    await controller.get(req, res);
    const expectedData: PageData = {
      ...i18n['postcode-search'],
      path: '/postcode',
    };
    expect(res.render).toBeCalledWith('postcode-search', expectedData);
  });

  test('Should render the postcode search page with error if postcode is invalid', async () => {
    const req = mockRequest(i18n);
    req.body = {
      postcode: ''
    };
    const res = mockResponse();
    await controller.post(req, res);
    const expectedData: PageData = {
      ...i18n['postcode-search'],
      path: '/postcode',
      errors: true
    };
    expect(res.render).toBeCalledWith('postcode-search', expectedData);
  });

  test('Should redirect if the postcode is valid', async () => {
    const req = mockRequest(i18n);
    req.body = {
      postcode: 'EH1 9SP'
    };
    const res = mockResponse();
    await controller.post(req, res);
    expect(res.redirect).toBeCalledWith('/results');
  });
});
