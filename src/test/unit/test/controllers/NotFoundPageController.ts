import { mockRequest } from '../../utils/mockRequest';
import { mockResponse } from '../../utils/mockResponse';
import { NotFoundPageController } from '../../../../main/controllers/NotFoundPageController';

const i18n = {
  notFound: {},
};

describe('Not found page Controller', () => {
  const controller = new NotFoundPageController();
  test('Should render the not found page', async () => {
    const req = mockRequest(i18n);
    const res = mockResponse();
    await controller.get(req, res);
    expect(res.render).toBeCalledWith('not-found', i18n.notFound);
  });
});
