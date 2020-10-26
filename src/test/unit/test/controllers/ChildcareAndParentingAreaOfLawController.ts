import { mockRequest } from '../../utils/mockRequest';
import { mockResponse } from '../../utils/mockResponse';
import { PageData } from '../../../../main/interfaces/PageData';
import { ChildcareAndParentingAreaOfLawController } from '../../../../main/controllers/areaOfLaw/ChildcareAndParentingAreaOfLawController';

const i18n = {
  'childcare-and-parenting-area-of-law': {},
};

describe('Childcare and Parenting Area of Law Controller', () => {
  const controller = new ChildcareAndParentingAreaOfLawController();

  test('Should render the Childcare and Parenting Area of Law page', async () => {
    const req = mockRequest(i18n);
    const res = mockResponse();
    await controller.get(req, res);
    expect(res.render).toBeCalledWith('childcare-and-parenting-area-of-law', i18n['childcare-and-parenting-area-of-law']);
  });

  test('Should render Childcare and Parenting Area of Law page with errors if no data has been entered', async () => {
    const req = mockRequest(i18n);
    req.body = {};
    const res = mockResponse();
    await controller.post(req, res);
    const expectedData: PageData = {
      ...i18n['childcare-and-parenting-area-of-law'],
      path: '/service-area-childcare-parenting',
      errors: true,
    };
    expect(res.render).toBeCalledWith('childcare-and-parenting-area-of-law', expectedData);
  });
});
