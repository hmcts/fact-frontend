import { mockRequest } from '../../utils/mockRequest';
import { mockResponse } from '../../utils/mockResponse';
import { PageData } from '../../../../main/interfaces/PageData';
import { FamilyAreaOfLawController } from '../../../../main/controllers/areaOfLaw/FamilyAreaOfLawController';

const i18n = {
  'family-area-of-law': {},
};

describe('Family Area of Law Controller', () => {
  const controller = new FamilyAreaOfLawController();

  test('Should render the Family Area of Law page', async () => {
    const req = mockRequest(i18n);
    const res = mockResponse();
    await controller.get(req, res);
    expect(res.render).toBeCalledWith('family-area-of-law', i18n['family-area-of-law']);
  });

  test('Should render Family Area of Law page with errors if no data has been entered', async () => {
    const req = mockRequest(i18n);
    req.body = {};
    const res = mockResponse();
    await controller.post(req, res);
    const expectedData: PageData = {
      ...i18n['family-area-of-law'],
      path: '/service-area-probate-divorce-civil-partnerships',
      errors: true,
    };
    expect(res.render).toBeCalledWith('family-area-of-law', expectedData);
  });
});
