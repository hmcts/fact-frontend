import { PageData } from '../../../../../main/interfaces/PageData';
import { mockRequest } from '../../../utils/mockRequest';
import { mockResponse } from '../../../utils/mockResponse';
import { SearchResultsController } from '../../../../../main/controllers/search/SearchResultsController';

const i18n = {
  search: {
    location: {
      foundResults: '',
      foundResult: '',
      errorBlank: {
        title: 'There is a problem',
        text: 'Enter a court name, address, town or city'
      },
      errorTooShort: {
        title: 'There is a problem',
        text: 'Search must be 3 characters or more'
      }
    },
  },
};

describe('SearchResultsController', () => {
  const response: any = { data: [] };
  const searchCourtNameHistoryResponse: any = { data: [] };
  const api: any = {
    search: async () => response.data ,
    searchCourtNameHistory: async () => searchCourtNameHistoryResponse.data
  };
  const controller = new SearchResultsController(api);

  test('Should render the location search page if not data was entered', async () => {
    const req = mockRequest(i18n);
    req.query = { search: '' };
    const res = mockResponse();
    await controller.get(req, res);
    const expectedData: PageData = {
      ...i18n.search.location,
      path: '/courts',
      results: [],
      error: i18n.search.location.errorBlank,
      search: '',
      courtHistoryFlag: true
    };
    expect(res.render).toBeCalledWith('search/location', expectedData);
  });

  test('Should render the location search page if not data was too short', async () => {
    const req = mockRequest(i18n);
    req.query = { search: 'lo' };
    const res = mockResponse();
    await controller.get(req, res);
    const expectedData: PageData = {
      ...i18n.search.location,
      path: '/courts',
      results: [],
      error: i18n.search.location.errorTooShort,
      search: 'lo',
      courtHistoryFlag: true
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
      path: '/courts',
      search: req.query.search,
      results: [],
      courtHistoryFlag: true
    };
    expect(res.render).toBeCalledWith('search/location', expectedData);
  });

  test('Should render the search for location page with results', async () => {
    response.data = [{
      name: 'London',
      slug: 'London',
      address: 'Address Street',
      'townName': 'AAA',
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
      path: '/courts',
      search: req.query.search,
      results: response.data,
      courtHistoryFlag: true
    };
    expect(res.render).toBeCalledWith('search/location', expectedData);
  });
});
