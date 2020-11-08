import { mockRequest } from '../../../utils/mockRequest';
import { mockResponse } from '../../../utils/mockResponse';
import { PageData } from '../../../../../main/interfaces/PageData';
import { ServiceSearchResultsController } from '../../../../../main/controllers/service/ServiceSearchResultsController';

const i18n = {
  'service-results': {},
  'postcode-search': {}
};

describe('Service Search Results Controller', () => {
  const controller = new ServiceSearchResultsController();

  test('Should render the postcode search page', async () => {
    const req = mockRequest(i18n);
    req.query = {
      postcode: 'EH1 9SP'
    };
    const res = mockResponse();
    await controller.get(req, res);
    expect(res.render).toBeCalledWith('service-results', i18n['service-results']);
  });

  test('Should render the postcode search page with error if postcode is invalid', async () => {
    const req = mockRequest(i18n);
    req.query = {
      postcode: ''
    };
    const res = mockResponse();
    await controller.get(req, res);
    const expectedData: PageData = {
      ...i18n['postcode-search'],
      path: '/search-by-postcode',
      errors: true
    };
    expect(res.render).toBeCalledWith('postcode-search', expectedData);
  });
});
