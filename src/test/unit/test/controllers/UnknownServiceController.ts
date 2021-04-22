import { UnknownServiceController } from '../../../../main/controllers/service/UnknownServiceController';
import { mockRequest } from '../../utils/mockRequest';
import { mockResponse } from '../../utils/mockResponse';

const i18n = {
  unknownService: {},
};

describe('UnknownServiceController', () => {
  const controller = new UnknownServiceController();
  test('Should render the search option page', async () => {
    const req = mockRequest(i18n);
    req.query = {};
    const res = mockResponse();
    await controller.get(req, res);
    expect(res.render).toBeCalledWith('unknown-service', i18n.unknownService);
  });
});
