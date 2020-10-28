import { mockRequest } from '../../utils/mockRequest';
import { mockResponse } from '../../utils/mockResponse';
import { PageData } from '../../../../main/interfaces/PageData';
import { ChildcareAndParentingAreaOfLawController } from '../../../../main/controllers/areaOfLaw/ChildcareAndParentingAreaOfLawController';
const expectedChildcareAndParentingAreaOfLaw = require('../../../resources/childcare-and-parenting-area-of-law-results.json');

const i18n = {
  'childcare-and-parenting-area-of-law': {
    name: '',
    description: '',
  },
};

describe('Childcare and Parenting Area of Law Controller', () => {
  const response: any = { data: {} };
  const api: any = { childcareAndParentingAreaOfLaw: async () => response.data };
  const controller = new ChildcareAndParentingAreaOfLawController(api);

  test('Should render the Childcare and Parenting Area of Law page', async () => {
    response.data = expectedChildcareAndParentingAreaOfLaw;
    const req = mockRequest(i18n);
    const res = mockResponse();
    await controller.get(req, res);

    const expectedData: PageData = {
      ...i18n['childcare-and-parenting-area-of-law'],
      path: '/services/childcare-and-parenting/service-areas',
      results: response.data
    };
    expect(res.render).toBeCalledWith('childcare-and-parenting-area-of-law', expectedData);
  });

  test('Should render Childcare and Parenting Area of Law page with errors if no data has been entered', async () => {
    response.data = expectedChildcareAndParentingAreaOfLaw;
    const req = mockRequest(i18n);
    req.body = {};
    const res = mockResponse();
    await controller.post(req, res);

    const expectedData: PageData = {
      ...i18n['childcare-and-parenting-area-of-law'],
      path: '/services/childcare-and-parenting/service-areas',
      results: response.data,
      errors: true
    };
    expect(res.render).toBeCalledWith('childcare-and-parenting-area-of-law', expectedData);
  });
});
