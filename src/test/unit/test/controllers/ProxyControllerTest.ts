import {mockRequest} from '../../utils/mockRequest';
import {mockResponse} from '../../utils/mockResponse';
import {ProxyController} from '../../../../main/controllers/ProxyController';

describe('ProxyController', () => {

  const expectedCourtDetails = require('../../../resources/court-details-results.json');
  const testSlug = 'test-slug';
  const testLng = 'en';
  const testPostcode = 'PO5TC0D3';
  const testServiceArea = 'service-area';
  const response = { data: expectedCourtDetails };
  const api: any = {
    court: async () => response.data,
    postcodeServiceAreaSearch: async () => response.data
  };
  const data = {};
  const controller = new ProxyController(api);

  beforeEach(() => {
    jest.spyOn(api, 'court');
    jest.spyOn(api, 'postcodeServiceAreaSearch');
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
      serviceArea: testServiceArea
    };
    req.lng = testLng;
    await controller.getCourtsByPostcodeServiceArea(req, res);

    expect(api.postcodeServiceAreaSearch).toBeCalledWith(req.params.postcode, req.params.serviceArea, req.lng);
    expect(res.send).toBeCalledWith(expectedCourtDetails);
  });
});
