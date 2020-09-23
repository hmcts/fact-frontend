import { getSearchOption, postSearchOption, getLocationSearch, getSearchResults } from '../../../main/controllers/search';
import { PageData } from '../../../main/interfaces/pageData';
import { FactApi } from '../../../main/utils/fact-api';

const i18n = {
  search: {
    option: {},
    location: {
      foundResults: '',
    },
  },
};

const mockRequest = () => {
  const req: any = {
    body: '',
    i18n: {
      getDataByLanguage: '',
    },
  };
  req.body = jest.fn().mockReturnValue(req);
  req.i18n.getDataByLanguage = jest.fn().mockReturnValue(i18n);
  return req;
};

const mockResponse = () => {
  const res: any = {};
  res.redirect = jest.fn().mockReturnValue(res);
  res.render = jest.fn().mockReturnValue(res);
  return res;
};

describe('Search Controller', () => {
  describe('getSearchOption', () => {
    test('Should render the search option page', async () => {
      const req = mockRequest();
      const res = mockResponse();
      await getSearchOption(req, res);
      expect(res.render).toBeCalledWith('search/option', i18n.search.option);
    });
  });

  describe('postSearchOption', () => {
    test('Should redirect the location search page', async () => {
      const req = mockRequest();
      req.body = {
        knowLocation: 'yes',
      };
      const res = mockResponse();
      await postSearchOption(req, res);
      expect(res.redirect).toHaveBeenCalledWith('/location-search');
    });

    // TODO story if the user doesnt know the name
    test('Should redirect the home page', async () => {
      const req = mockRequest();
      req.body = {
        knowLocation: 'no',
      };
      const res = mockResponse();
      await postSearchOption(req, res);
      expect(res.redirect).toHaveBeenCalledWith('/');
    });

    test('Should render search option if no data has been entered', async () => {
      const req = mockRequest();
      req.body = {};
      const res = mockResponse();
      await postSearchOption(req, res);
      const expectedData: PageData = {
        ...i18n.search.option,
        path: '/search-option',
        errors: true,
      };
      expect(res.render).toBeCalledWith('search/option', expectedData);
    });
  });

  describe('getLocationSearch', () => {
    test('Should render the location search page', async () => {
      const req = mockRequest();
      const res = mockResponse();
      await getLocationSearch(req, res);
      const expectedData: PageData = {
        ...i18n.search.location,
        path: '/location-search',
      };
      expect(res.render).toBeCalledWith('search/location', expectedData);
    });

    test('Should render the location search page if not data was entered', async () => {
      const req = mockRequest();
      req.query = {};
      const res = mockResponse();
      await getSearchResults(req, res);
      const expectedData: PageData = {
        ...i18n.search.location,
        path: '/search-for-location',
        results: [],
        errors: true,
      };
      expect(res.render).toBeCalledWith('search/location', expectedData);
    });

    test('Should render the search for location page with empty results', async () => {
      const results: any = [];
      const spy = jest.spyOn(FactApi, 'search');
      spy.mockReturnValue(Promise.resolve(results));
      const req = mockRequest();
      req.query = {
        search: 'AAA',
      };
      const res = mockResponse();
      await getSearchResults(req, res);

      const expectedData: PageData = {
        ...i18n.search.location,
        path: '/search-for-location',
        search: req.query.search,
        results: [],
      };
      expect(res.render).toBeCalledWith('search/location', expectedData);
      spy.mockRestore();
    });

    test('Should render the search for location page with results', async () => {
      const results: any = [{
        name: 'London',
        slug: 'London',
        address: 'Address Street',
        'town_name': 'AAA',
        postcode: 'AAA AAA',
      }];
      const spy = jest.spyOn(FactApi, 'search');
      spy.mockReturnValue(Promise.resolve(results));
      const req = mockRequest();
      req.query = {
        search: 'london',
      };
      const res = mockResponse();
      await getSearchResults(req, res);
      const expectedData: PageData = {
        ...i18n.search.location,
        path: '/search-for-location',
        search: req.query.search,
        results: results,
      };
      expect(res.render).toBeCalledWith('search/location', expectedData);
      spy.mockRestore();
    });
  });
});
