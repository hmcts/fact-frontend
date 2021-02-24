import { ErrorPageController } from '../../../../main/controllers/ErrorPageController';
import { mockRequest } from '../../utils/mockRequest';
import { mockResponse } from '../../utils/mockResponse';

const i18n = {
  error: {},
};

describe('Error page Controller', () => {
  const controller = new ErrorPageController();
  test('Should render the error option page', async () => {
    const req = mockRequest(i18n);
    const res = mockResponse();
    await controller.get(req, res);
    expect(res.render).toBeCalledWith('error', i18n.error);
  });
});
