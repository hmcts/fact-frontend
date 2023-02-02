import {mockRequest} from '../../utils/mockRequest';
import {mockResponse} from '../../utils/mockResponse';
import {ProxyController} from '../../../../main/controllers/ProxyController';

describe('ProxyController', () => {

  const expectedCourtDetails = require('../../../resources/court-details-results.json');
  const expectedCourtDetailsByCourtTypes = require('../../../resources/court-details-by-court-types-results.json');
  const testSlug = 'test-slug';
  const testLng = 'en';
  const testPostcode = 'PO5TC0D3';
  const testServiceArea = 'service-area';
  const testAction = '';
  const response = { data: expectedCourtDetails };
  const testCourtTypes = 'family,county';
  const api: any = {
    court: async () => response.data,
    postcodeServiceAreaSearch: async () => response.data,
    courtTypesSearch : async () => expectedCourtDetailsByCourtTypes
  };
  const data = {};
  const controller = new ProxyController(api);

  beforeEach(() => {
    jest.spyOn(api, 'court');
    jest.spyOn(api, 'postcodeServiceAreaSearch');
    jest.spyOn(api, 'courtTypesSearch');
  });

  test('Should return court details', async () => {
    const req = mockRequest(data);
    const res = mockResponse();
    req.params = {
      slug: testSlug
    };
    req.lng = testLng;
    await controller.getCourtDetails(req, res);

    expect(api.court).toBeCalledWith(req.params.slug, req.lng);
    expect(res.send).toBeCalledWith(expectedCourtDetails);
  });

  test('Should return court details by postcode and service area', async () => {
    const req = mockRequest(data);
    const res = mockResponse();
    req.params = {
      postcode: testPostcode,
      serviceArea: testServiceArea,
      action: testAction
    };
    req.lng = testLng;
    await controller.getCourtsByPostcodeServiceArea(req, res);

    expect(api.postcodeServiceAreaSearch).toBeCalledWith(req.params.postcode, req.params.serviceArea, req.params.action, req.lng);
    expect(res.send).toBeCalledWith(expectedCourtDetails);
  });

  test('Should return court details by court types', async () => {
    const req = mockRequest(data);
    const res = mockResponse();
    req.params = {
      courtTypes: testCourtTypes
    };
    await controller.getCourtsByCourtTypes(req, res);

    expect(api.courtTypesSearch).toBeCalledWith(req.params.courtTypes);
    expect(res.send).toBeCalledWith(expectedCourtDetailsByCourtTypes);
  });
});
