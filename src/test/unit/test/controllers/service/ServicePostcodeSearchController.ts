import { ServicePostcodeSearchController } from '../../../../../main/controllers/service/ServicePostcodeSearchController';
import { mockRequest } from '../../../utils/mockRequest';
import { mockResponse } from '../../../utils/mockResponse';
import { PageData } from '../../../../../main/interfaces/PageData';

const i18n = {
  'postcode-search': {
    hint: '{serviceArea}',
    errorType: ''
  }
};

describe('Service Postcode Search Controller', () => {
  const response: any = { ServiceAreaResult: { name: 'serviceAreaName'} };
  const api: any = {
    getServiceArea: async () => response.ServiceAreaResult,
  };
  const controller = new ServicePostcodeSearchController(api);

  test('Should render the postcode search page when searching with postcode only', async () => {
    const req = mockRequest(i18n);
    req.query = {
      error: ''
    };
    req.params = {
      postcode: 'ABC1234'
    };
    const res = mockResponse();
    await controller.getCourtsByPostcodeOnly(req, res);
    const expectedData: PageData = {
      ...i18n['postcode-search'],
      path: '/search-by-postcode',
      actionUrl: '/services/courts/near',
      error: false,
      hasNoResults: false,
      postcode: undefined,
      hint: 'the services nearest'
    };
    expect(res.render).toBeCalledWith('postcode-search', expectedData);
  });

  test('Should render the postcode search page', async () => {
    const req = mockRequest(i18n);
    req.query = {
      error: ''
    };
    req.params = {
      service: 'money',
      serviceArea: 'tax'
    };
    const res = mockResponse();
    await controller.get(req, res);
    const expectedData: PageData = {
      ...i18n['postcode-search'],
      path: '/search-by-postcode',
      actionUrl: '/services/money/tax/courts/near',
      error: false,
      hasNoResults: false,
      serviceAreaIsChildcare: false,
      postcode: undefined,
      hint: 'serviceareaname'
    };
    expect(res.render).toBeCalledWith('postcode-search', expectedData);
  });

  test('Should render the postcode search page with blank postcode error when searching by postcode', async () => {
    const req = mockRequest(i18n);
    req.query = {
      error: 'blankPostcode',
    };
    req.params = {
      postcode: 'ABC1234'
    };
    const res = mockResponse();
    await controller.getCourtsByPostcodeOnly(req, res);
    const expectedData: PageData = {
      ...i18n['postcode-search'],
      path: '/search-by-postcode',
      actionUrl: '/services/courts/near',
      error: true,
      errorType: 'blankPostcode',
      hasNoResults: false,
      postcode: undefined,
      hint: 'the services nearest'
    };
    expect(res.render).toBeCalledWith('postcode-search', expectedData);
  });
  
  test('Should render the postcode search page with blank postcode error', async () => {
    const req = mockRequest(i18n);
    req.query = {
      error: 'blankPostcode',
    };
    req.params = {
      service: 'money',
      serviceArea: 'tax'
    };
    const res = mockResponse();
    await controller.get(req, res);
    const expectedData: PageData = {
      ...i18n['postcode-search'],
      path: '/search-by-postcode',
      actionUrl: '/services/money/tax/courts/near',
      error: true,
      errorType: 'blankPostcode',
      hasNoResults: false,
      serviceAreaIsChildcare: false,
      postcode: undefined,
      hint: 'serviceareaname'
    };
    expect(res.render).toBeCalledWith('postcode-search', expectedData);
  });

  test('Should render the postcode search page with invalid postcode error when searching by postcode', async () => {
    const req = mockRequest(i18n);
    req.query = {
      error: 'invalidPostcode'
    };
    req.params = {
      postcode: 'ABC1234'
    };
    const res = mockResponse();
    await controller.getCourtsByPostcodeOnly(req, res);
    const expectedData: PageData = {
      ...i18n['postcode-search'],
      path: '/search-by-postcode',
      actionUrl: '/services/courts/near',
      error: true,
      errorType: 'invalidPostcode',
      hasNoResults: false,
      postcode: undefined,
      hint: 'the services nearest'
    };
    expect(res.render).toBeCalledWith('postcode-search', expectedData);
  });

  test('Should render the postcode search page with invalid postcode error', async () => {
    const req = mockRequest(i18n);
    req.query = {
      error: 'invalidPostcode'
    };
    req.params = {
      service: 'money',
      serviceArea: 'tax'
    };
    const res = mockResponse();
    await controller.get(req, res);
    const expectedData: PageData = {
      ...i18n['postcode-search'],
      path: '/search-by-postcode',
      actionUrl: '/services/money/tax/courts/near',
      error: true,
      errorType: 'invalidPostcode',
      hasNoResults: false,
      serviceAreaIsChildcare: false,
      postcode: undefined,
      hint: 'serviceareaname'
    };
    expect(res.render).toBeCalledWith('postcode-search', expectedData);
  });

  test('Should render the postcode search page with scottish postcode error when searching by postcode', async () => {
    const req = mockRequest(i18n);
    req.query = {
      error: 'scottishPostcode'
    };
    req.params = {
      postcode: 'ABC1234'
    };
    const res = mockResponse();
    await controller.getCourtsByPostcodeOnly(req, res);
    const expectedData: PageData = {
      ...i18n['postcode-search'],
      path: '/search-by-postcode',
      actionUrl: '/services/courts/near',
      error: true,
      errorType: 'scottishPostcode',
      hasNoResults: false,
      postcode: undefined,
      hint: 'the services nearest'
    };
    expect(res.render).toBeCalledWith('postcode-search', expectedData);
  });

  test('Should render the postcode search page with scottish postcode error', async () => {
    const req = mockRequest(i18n);
    req.query = {
      error: 'scottishPostcode'
    };
    req.params = {
      service: 'money',
      serviceArea: 'tax'
    };
    const res = mockResponse();
    await controller.get(req, res);
    const expectedData: PageData = {
      ...i18n['postcode-search'],
      path: '/search-by-postcode',
      actionUrl: '/services/money/tax/courts/near',
      error: true,
      errorType: 'scottishPostcode',
      hasNoResults: false,
      serviceAreaIsChildcare: false,
      postcode: undefined,
      hint: 'serviceareaname'
    };
    expect(res.render).toBeCalledWith('postcode-search', expectedData);
  });

  test('Should render the postcode search page with scottish children postcode error when searching by postcode', async () => {
    const req = mockRequest(i18n);
    req.query = {
      error: 'scottishChildrenPostcode'
    };
    req.params = {
      postcode: 'ABC1234'
    };
    const res = mockResponse();
    await controller.getCourtsByPostcodeOnly(req, res);
    const expectedData: PageData = {
      ...i18n['postcode-search'],
      path: '/search-by-postcode',
      actionUrl: '/services/courts/near',
      error: true,
      errorType: 'scottishChildrenPostcode',
      hasNoResults: false,
      postcode: undefined,
      hint: 'the services nearest'
    };
    expect(res.render).toBeCalledWith('postcode-search', expectedData);
  });

  test('Should render the postcode search page with scottish children postcode error', async () => {
    const req = mockRequest(i18n);
    req.query = {
      error: 'scottishChildrenPostcode'
    };
    req.params = {
      service: 'childcare-and-parenting',
      serviceArea: 'childcare-arrangements'
    };
    const res = mockResponse();
    await controller.get(req, res);
    const expectedData: PageData = {
      ...i18n['postcode-search'],
      path: '/search-by-postcode',
      actionUrl: '/services/childcare-and-parenting/childcare-arrangements/courts/near',
      error: true,
      errorType: 'scottishChildrenPostcode',
      hasNoResults: false,
      serviceAreaIsChildcare: true,
      postcode: undefined,
      hint: 'serviceareaname'
    };
    expect(res.render).toBeCalledWith('postcode-search', expectedData);
  });

  test('Should render the postcode search page with northern ireland postcode error when searching by postcode', async () => {
    const req = mockRequest(i18n);
    req.query = {
      error: 'northernIrelandPostcode'
    };
    req.params = {
      postcode: 'ABC1234'
    };
    const res = mockResponse();
    await controller.getCourtsByPostcodeOnly(req, res);
    const expectedData: PageData = {
      ...i18n['postcode-search'],
      path: '/search-by-postcode',
      actionUrl: '/services/courts/near',
      error: true,
      errorType: 'northernIrelandPostcode',
      hasNoResults: false,
      postcode: undefined,
      hint: 'the services nearest'
    };
    expect(res.render).toBeCalledWith('postcode-search', expectedData);
  });

  test('Should render the postcode search page with northern ireland postcode error', async () => {
    const req = mockRequest(i18n);
    req.query = {
      error: 'northernIrelandPostcode'
    };
    req.params = {
      service: 'money',
      serviceArea: 'tax'
    };
    const res = mockResponse();
    await controller.get(req, res);
    const expectedData: PageData = {
      ...i18n['postcode-search'],
      path: '/search-by-postcode',
      actionUrl: '/services/money/tax/courts/near',
      error: true,
      errorType: 'northernIrelandPostcode',
      hasNoResults: false,
      serviceAreaIsChildcare: false,
      postcode: undefined,
      hint: 'serviceareaname'
    };
    expect(res.render).toBeCalledWith('postcode-search', expectedData);
  });

  test('Should render the postcode search page with no results when searching by postcode', async () => {
    const req = mockRequest(i18n);
    req.query = {
      postcode: 'E1 8DY',
      noResults: 'true'
    };
    req.params = {
      postcode: 'E1 8DY',
    };
    const res = mockResponse();
    await controller.getCourtsByPostcodeOnly(req, res);
    const expectedData: PageData = {
      ...i18n['postcode-search'],
      path: '/search-by-postcode',
      actionUrl: '/services/courts/near',
      error: false,
      hasNoResults: true,
      postcode: "E1 8DY",
      hint: 'the services nearest'
    };
    expect(res.render).toBeCalledWith('postcode-search', expectedData);
  });

  test('Should render the postcode search page with no results', async () => {
    const req = mockRequest(i18n);
    req.query = {
      postcode: 'E1 8DY',
      noResults: 'true'
    };
    req.params = {
      service: 'money',
      serviceArea: 'tax'
    };
    const res = mockResponse();
    await controller.get(req, res);
    const expectedData: PageData = {
      ...i18n['postcode-search'],
      path: '/search-by-postcode',
      actionUrl: '/services/money/tax/courts/near',
      error: false,
      hasNoResults: true,
      serviceAreaIsChildcare: false,
      postcode: 'E1 8DY',
      hint: 'serviceareaname'
    };
    expect(res.render).toBeCalledWith('postcode-search', expectedData);
  });
});
