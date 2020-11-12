import { ServicePostcodeResultsController } from '../../../../../main/controllers/service/ServicePostcodeResultsController';
import { mockRequest } from '../../../utils/mockRequest';
import { mockResponse } from '../../../utils/mockResponse';
import { PageData } from '../../../../../main/interfaces/PageData';

const i18n = {
  'postcode-results': {
    multipleResultsHint: ''
  }
};

describe('Service Postcode Results Controller', () => {
  const response: any = { CourtDetailsWithDistanceResult: ['court1', 'court2'] };
  const api: any = {
    postcodeServiceAreaSearch: async () => response.CourtDetailsWithDistanceResult
  };
  const controller = new ServicePostcodeResultsController(api);

  test('Should render the service results page', async () => {
    const req = mockRequest(i18n);
    req.query = {
      postcode: 'E8 1DY',
      aol: 'tax',
      serviceAreaType: 'Other'
    };
    req.params = {
      service: 'money',
      serviceArea: 'tax'
    };
    const expectedData: PageData = {
      ...i18n['postcode-results'],
      path: '/courts/near',
      errors: false,
      results: response.CourtDetailsWithDistanceResult
    };
    const res = mockResponse();
    await controller.get(req, res);
    expect(res.render).toBeCalledWith('postcode-results', expectedData);
  });

  test('Should redirect to the postcode search page with blank postcode error', async () => {
    const req = mockRequest(i18n);
    req.query = {
      postcode: '',
      aol: 'tax',
      serviceAreaType: 'Other'
    };
    req.params = {
      service: 'money',
      serviceArea: 'tax'
    };
    const res = mockResponse();
    await controller.get(req, res);
    expect(res.redirect).toBeCalledWith('/services/money/tax/search-by-postcode?serviceAreaType=Other&aol=tax&error=blankPostcode');
  });

  test('Should redirect to the postcode search page with invalid postcode error', async () => {
    const req = mockRequest(i18n);
    req.query = {
      postcode: 'not a postcode',
      aol: 'tax',
      serviceAreaType: 'Other'
    };
    req.params = {
      service: 'money',
      serviceArea: 'tax'
    };
    const res = mockResponse();
    await controller.get(req, res);
    expect(res.redirect).toBeCalledWith('/services/money/tax/search-by-postcode?serviceAreaType=Other&aol=tax&error=invalidPostcode');
  });

  test('Should redirect to the postcode search page with no results info', async () => {
    const req = mockRequest(i18n);
    req.query = {
      postcode: 'E8 1DY',
      aol: 'tax',
      serviceAreaType: 'Other'
    };
    req.params = {
      service: 'money',
      serviceArea: 'tax'
    };
    const res = mockResponse();
    api.postcodeServiceAreaSearch = async (): Promise<any> => [];
    await controller.get(req, res);
    expect(res.redirect).toBeCalledWith('/services/money/tax/search-by-postcode?serviceAreaType=Other&aol=tax&noResults=true&postcode=E8 1DY');
  });
});
