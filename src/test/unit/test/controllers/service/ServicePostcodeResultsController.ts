import { ServicePostcodeResultsController } from '../../../../../main/controllers/service/ServicePostcodeResultsController';
import { cloneDeep } from 'lodash';
import { mockRequest } from '../../../utils/mockRequest';
import { mockResponse } from '../../../utils/mockResponse';
import { PageData } from '../../../../../main/interfaces/PageData';
import { CourtWithDistanceResultsData } from '../../../../../main/interfaces/PostcodeResultsData';

const i18n = {
  'postcode-results': {
    multipleResultsHint: '',
    singleResultsHint: '',
    secondHint: '',
    postcodeSearchResultsHint: ''
  }
};

describe('Service Postcode Results Controller', () => {
  const response: any = { CourtDetailsWithDistanceResult: {
    courts: ['court1', 'court2']
  }};
  const postcodeSearchResponse: Record<string, any> = [
    {
      'name': 'Test Combined Court',
      'slug': 'test-combined-court',
      'distance': 10.0
    },
    {
      'name': 'Test Central Finance Unit',
      'slug': 'test-central-finance-unit',
      'distance': 10.1
    }];
  const api: any = {
    postcodeServiceAreaSearch: async () => response.CourtDetailsWithDistanceResult,
    postcodeAreaSearch: async () => postcodeSearchResponse
  };
  const controller = new ServicePostcodeResultsController(api);

  test('Should render the service results page', async () => {
    const req = mockRequest(i18n);
    req.query = {
      postcode: 'E8 1DY'
    };
    req.params = {
      service: 'money',
      serviceArea: 'tax'
    };
    const expectedData: PageData = {
      ...i18n['postcode-results'],
      path: '/courts/near',
      errors: false,
      results: response.CourtDetailsWithDistanceResult,
      isDivorceOrCivil: false,
      serviceArea: req.params.serviceArea
    };
    const res = mockResponse();
    await controller.get(req, res);
    expect(res.render).toBeCalledWith('postcode-results', expectedData);
  });

  test('Searching by postcode should render the service results page', async () => {
    const req = mockRequest(i18n);
    req.query = {
      postcode: 'E8 1DY'
    };
    const expectedData: CourtWithDistanceResultsData = {
      ...cloneDeep(req.i18n.getDataByLanguage(req.lng)['postcode-results']),
      path: '/courts/near',
      errors: false,
      postcodeOnlySearch: true,
      results: { 
        'courts': postcodeSearchResponse 
      }
    };
    const res = mockResponse();
    await controller.getCourtResultsByPostcode(req, res);
    expect(res.render).toBeCalledWith('postcode-results', expectedData);
  });

  test('Should render the service results page for divorce', async () => {
    const req = mockRequest(i18n);
    req.query = {
      postcode: 'E8 1DY'
    };
    req.params = {
      service: 'probate-divorce-or-ending-civil-partnerships',
      serviceArea: 'divorce'
    };
    const expectedData: PageData = {
      ...i18n['postcode-results'],
      path: '/courts/near',
      errors: false,
      results: response.CourtDetailsWithDistanceResult,
      isDivorceOrCivil: true,
      serviceArea: req.params.serviceArea
    };
    const res = mockResponse();
    await controller.get(req, res);
    expect(res.render).toBeCalledWith('postcode-results', expectedData);
  });

  test('Searching by postcode should redirect to the postcode search page with blank postcode error', async () => {
    const req = mockRequest(i18n);
    req.query = {
      postcode: ''
    };
    const res = mockResponse();
    await controller.getCourtResultsByPostcode(req, res);
    expect(res.redirect).toBeCalledWith('/services/search-by-postcode?error=blankPostcode');
  });

  test('Should redirect to the postcode search page with blank postcode error', async () => {
    const req = mockRequest(i18n);
    req.query = {
      postcode: '',
    };
    req.params = {
      service: 'money',
      serviceArea: 'tax'
    };
    const res = mockResponse();
    await controller.get(req, res);
    expect(res.redirect).toBeCalledWith('/services/money/tax/search-by-postcode?error=blankPostcode');
  });

  test('Searching by postcode should redirect to the postcode search page with invalid postcode error', async () => {
    const req = mockRequest(i18n);
    req.query = {
      postcode: 'a naughty postcode'
    };
    const res = mockResponse();
    await controller.getCourtResultsByPostcode(req, res);
    expect(res.redirect).toBeCalledWith('/services/search-by-postcode?error=invalidPostcode');
  });

  test('Should redirect to the postcode search page with invalid postcode error', async () => {
    const req = mockRequest(i18n);
    req.query = {
      postcode: 'not a postcode'
    };
    req.params = {
      service: 'money',
      serviceArea: 'tax'
    };
    const res = mockResponse();
    await controller.get(req, res);
    expect(res.redirect).toBeCalledWith('/services/money/tax/search-by-postcode?error=invalidPostcode');
  });

  test('Searching by postcode should redirect to the postcode search page with scottish postcode error', async () => {
    const req = mockRequest(i18n);
    req.query = {
      postcode: 'AB10 1WP'
    };
    const res = mockResponse();
    await controller.getCourtResultsByPostcode(req, res);
    expect(res.redirect).toBeCalledWith('/services/search-by-postcode?error=scottishPostcode');
  });

  test('Should redirect to the postcode search page with scottish postcode error', async () => {
    const req = mockRequest(i18n);
    req.query = {
      postcode: 'AB10 1WP'
    };
    req.params = {
      service: 'money',
      serviceArea: 'tax'
    };
    const res = mockResponse();
    await controller.get(req, res);
    expect(res.redirect).toBeCalledWith('/services/money/tax/search-by-postcode?error=scottishPostcode');
  });

  test('Should redirect to the postcode search page with scottish children postcode error', async () => {
    const req = mockRequest(i18n);
    req.query = {
      postcode: 'AB10 1WP'
    };
    req.params = {
      service: 'childcare-and-parenting',
      serviceArea: 'childcare-arrangements'
    };
    const res = mockResponse();
    await controller.get(req, res);
    expect(res.redirect).toBeCalledWith('/services/childcare-and-parenting/childcare-arrangements/search-by-postcode?error=scottishChildrenPostcode');
  });

  test('Searching by postcode should redirect to the postcode search page with NI postcode error', async () => {
    const req = mockRequest(i18n);
    req.query = {
      postcode: 'BT1 3LL'
    };
    const res = mockResponse();
    await controller.getCourtResultsByPostcode(req, res);
    expect(res.redirect).toBeCalledWith('/services/search-by-postcode?error=northernIrelandPostcode');
  });

  test('Should redirect to the postcode search page with northern ireland postcode error', async () => {
    const req = mockRequest(i18n);
    req.query = {
      postcode: 'BT1 3LL'
    };
    req.params = {
      service: 'money',
      serviceArea: 'tax'
    };
    const res = mockResponse();
    await controller.get(req, res);
    expect(res.redirect).toBeCalledWith('/services/money/tax/search-by-postcode?error=northernIrelandPostcode');
  });
  
  test('Searching by postcode should redirect to the service results page with no results info', async () => {
    const req = mockRequest(i18n);
    req.query = {
      postcode: 'E8 1DY'
    };
    const res = mockResponse();
    api.postcodeAreaSearch = async (): Promise<any> => {
      return [];
    };
    await controller.getCourtResultsByPostcode(req, res);
    expect(res.redirect).toBeCalledWith('/services/search-by-postcode?noResults=true&postcode=e8 1dy');
  });

  test('Should redirect to the postcode search page with no results info', async () => {
    const req = mockRequest(i18n);
    req.query = {
      postcode: 'E8 1DY'
    };
    req.params = {
      service: 'money',
      serviceArea: 'tax'
    };
    const res = mockResponse();
    api.postcodeServiceAreaSearch = async (): Promise<any> => {
      return { courts: [] };
    };
    await controller.get(req, res);
    expect(res.redirect).toBeCalledWith('/services/money/tax/search-by-postcode?noResults=true&postcode=E8 1DY');
  });

  test('Searching by postcode should redirect to the service results page with no results info w/ no courts', async () => {
    const req = mockRequest(i18n);
    req.query = {
      postcode: 'E8 1DY'
    };
    const res = mockResponse();
    api.postcodeAreaSearch = async (): Promise<any> => {
      return null;
    };
    await controller.getCourtResultsByPostcode(req, res);
    expect(res.redirect).toBeCalledWith('/services/search-by-postcode?noResults=true&postcode=e8 1dy');
  });

  test('Should redirect to the postcode search page with no results info due to no courts', async () => {
    const req = mockRequest(i18n);
    req.query = {
      postcode: 'E8 1DY'
    };
    req.params = {
      service: 'money',
      serviceArea: 'tax'
    };
    const res = mockResponse();
    api.postcodeServiceAreaSearch = async (): Promise<any> => {
      return { courts: null };
    };
    await controller.get(req, res);
    expect(res.redirect).toBeCalledWith('/services/money/tax/search-by-postcode?noResults=true&postcode=E8 1DY');
  });
});
