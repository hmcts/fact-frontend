import { LocationSearchController } from '../../../../../main/controllers/search/LocationSearchController';
import { mockRequest } from '../../../utils/mockRequest';
import { mockResponse } from '../../../utils/mockResponse';
import { PageData } from '../../../../../main/interfaces/PageData';

const i18n = {
  search: {
    location: {
      foundResults: '',
    },
  },
};

describe('Home Controller', () => {
  const controller = new LocationSearchController();

  test('Should render the location search page', async () => {
    const req = mockRequest(i18n);
    const res = mockResponse();
    await controller.get(req, res);
    const expectedData: PageData = {
      ...i18n.search.location,
      path: '/search',
    };
    expect(res.render).toBeCalledWith('search/location', expectedData);
  });
});
