import { SearchOptionController } from '../../../../../main/controllers/search/SearchOptionController';
import { PageData } from '../../../../../main/interfaces/PageData';
import { mockRequest } from '../../../utils/mockRequest';
import { mockResponse } from '../../../utils/mockResponse';

const i18n = {
  search: {
    option: {},
  },
};

describe('Search Option Controller', () => {
  const controller = new SearchOptionController();

  test('Should render the search option page', async () => {
    const req = mockRequest(i18n);
    const res = mockResponse();
    await controller.get(req, res);
    expect(res.render).toBeCalledWith('search/option', i18n.search.option);
  });

  test('Should redirect the location search page', async () => {
    const req = mockRequest(i18n);
    req.body = {
      knowLocation: 'yes',
    };
    const res = mockResponse();
    await controller.post(req, res);
    expect(res.redirect).toBeCalledWith('/search-by-name');
  });

  test('Should redirect to the Choose Action page', async () => {
    const req = mockRequest(i18n);
    req.body = {
      knowLocation: 'no',
    };
    const res = mockResponse();
    await controller.post(req, res);
    expect(res.redirect).toBeCalledWith('/service-choose-action');
  });

  test('Should redirect to the Search by postcode page', async () => {
    const req = mockRequest(i18n);
    req.body = {
      knowLocation: 'postcode',
    };
    const res = mockResponse();
    await controller.post(req, res);
    expect(res.redirect).toBeCalledWith('/services/search-by-postcode');
  });

  test('Should render search option if no data has been entered', async () => {
    const req = mockRequest(i18n);
    req.body = {};
    const res = mockResponse();
    await controller.post(req, res);
    const expectedData: PageData = {
      ...i18n.search.option,
      path: '/search-option',
      errors: true,
    };
    expect(res.render).toBeCalledWith('search/option', expectedData);
  });
});
