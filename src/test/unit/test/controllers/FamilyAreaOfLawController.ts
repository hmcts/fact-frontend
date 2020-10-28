import { mockRequest } from '../../utils/mockRequest';
import { mockResponse } from '../../utils/mockResponse';
import { PageData } from '../../../../main/interfaces/PageData';
import { FamilyAreaOfLawController } from '../../../../main/controllers/areaOfLaw/FamilyAreaOfLawController';
const expectedFamilyAreaOfLaw = require('../../../resources/family-area-of-law-results.json');

const i18n = {
  'family-area-of-law': {
    name: '',
    description: '',
  },
};

describe('Family Area of Law Controller', () => {
  const response: any = { data: {} };
  const api: any = { familyAreaOfLaw: async () => response.data };
  const controller = new FamilyAreaOfLawController(api);

  test('Should render the family Area of Law page', async () => {
    response.data = expectedFamilyAreaOfLaw;
    const req = mockRequest(i18n);
    const res = mockResponse();
    await controller.get(req, res);

    const expectedData: PageData = {
      ...i18n['family-area-of-law'],
      path: '/services/family/service-areas',
      results: response.data
    };
    expect(res.render).toBeCalledWith('family-area-of-law', expectedData);
  });

  test('Should render family Area of Law page with errors if no data has been entered', async () => {
    response.data = expectedFamilyAreaOfLaw;
    const req = mockRequest(i18n);
    req.body = {};
    const res = mockResponse();
    await controller.post(req, res);

    const expectedData: PageData = {
      ...i18n['family-area-of-law'],
      path: '/services/family/service-areas',
      results: response.data,
      errors: true
    };
    expect(res.render).toBeCalledWith('family-area-of-law', expectedData);
  });
});
