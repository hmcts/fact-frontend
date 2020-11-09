import { ServicePostcodeResultsController } from '../../../../../main/controllers/service/ServicePostcodeResultsController';
import { mockRequest } from '../../../utils/mockRequest';
import { mockResponse } from '../../../utils/mockResponse';

const i18n = {
  'postcode-search': {
    hint: ''
  }
};

describe('Service Postcode Results Controller', () => {
  const controller = new ServicePostcodeResultsController();
  test('Should render the service results page', async () => {
    const req = mockRequest(i18n);
    req.query = {
      postcode: 'E8 1DY'
    };
    const res = mockResponse();
    await controller.get(req, res);
    expect(res.render).toBeCalledWith('service-results');
  });

  test('Should redirect to the postcode search page with error', async () => {
    const req = mockRequest(i18n);
    req.query = {
      postcode: ''
    };
    req.params = {
      service: 'money',
      serviceArea: 'money-claims'
    };
    const res = mockResponse();
    await controller.get(req, res);
    expect(res.redirect).toBeCalledWith('/services/money/money-claims/search-by-postcode?error=true');
  });
});
