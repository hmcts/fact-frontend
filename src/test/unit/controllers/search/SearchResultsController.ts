import { PageData } from '../../../../main/interfaces/PageData';
import { mockRequest } from '../../../utils/mockRequest';
import { mockResponse } from '../../../utils/mockResponse';
import { SearchResultsController } from '../../../../main/controllers/search/SearchResultsController';

const i18n = {
  search: {
    option: {},
    location: {
      foundResults: '',
    },
  },
};

describe('SearchResultsController', () => {
  const response: any = { data: [] };
  const api: any = { search: async () => response.data };
  const controller = new SearchResultsController(api);

  test('Should render the location search page if not data was entered', async () => {
    const req = mockRequest(i18n);
    req.query = {};
    const res = mockResponse();
    await controller.get(req, res);
    const expectedData: PageData = {
      ...i18n.search.location,
      path: '/search-for-location',
      results: [],
      errors: true,
    };
    expect(res.render).toBeCalledWith('search/location', expectedData);
  });

  test('Should render the search for location page with empty results', async () => {
    const req = mockRequest(i18n);
    req.query = {
      search: 'AAA',
    };
    const res = mockResponse();
    await controller.get(req, res);

    const expectedData: PageData = {
      ...i18n.search.location,
      path: '/search-for-location',
      search: req.query.search,
      results: [],
      errors: false
    };
    expect(res.render).toBeCalledWith('search/location', expectedData);
  });

  test('Should render the search for location page with results', async () => {
    response.data = [{
      name: 'London',
      slug: 'London',
      address: 'Address Street',
      'town_name': 'AAA',
      postcode: 'AAA AAA',
    }];
    const req = mockRequest(i18n);
    req.query = {
      search: 'london',
    };
    const res = mockResponse();
    await controller.get(req, res);
    const expectedData: PageData = {
      ...i18n.search.location,
      path: '/search-for-location',
      search: req.query.search,
      results: response.data,
      errors: false
    };
    expect(res.render).toBeCalledWith('search/location', expectedData);
  });
});
