import { ServicePostcodeSearchController } from '../../../../../main/controllers/service/ServicePostcodeSearchController';
import { mockRequest } from '../../../utils/mockRequest';
import { mockResponse } from '../../../utils/mockResponse';
import { PageData } from '../../../../../main/interfaces/PageData';

const i18n = {
  'postcode-search': {
    hint: ''
  }
};

describe('Service Postcode Search Controller', () => {
  const controller = new ServicePostcodeSearchController();

  test('Should render the postcode search page', async () => {
    const req = mockRequest(i18n);
    req.query = {
      error: ''
    };
    req.params = {
      service: 'money',
      serviceArea: 'money-claims'
    };
    const res = mockResponse();
    await controller.get(req, res);
    const expectedData: PageData = {
      ...i18n['postcode-search'],
      path: '/search-by-postcode',
      actionUrl: '/services/money/money-claims/courts/near',
      errors: false
    };
    expect(res.render).toBeCalledWith('postcode-search', expectedData);
  });

  test('Should render the postcode search page with errors', async () => {
    const req = mockRequest(i18n);
    req.query = {
      error: 'true'
    };
    req.params = {
      service: 'money',
      serviceArea: 'money-claims'
    };
    const res = mockResponse();
    await controller.get(req, res);
    const expectedData: PageData = {
      ...i18n['postcode-search'],
      path: '/search-by-postcode',
      actionUrl: '/services/money/money-claims/courts/near',
      errors: true
    };
    expect(res.render).toBeCalledWith('postcode-search', expectedData);
  });
});
