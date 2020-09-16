import { getSearchOption, postSearchOption, getLocationSearch } from '../../../main/controllers/search';

const i18n = {
  search: {
    option: 'option',
    location: 'location',
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
        knowName: 'yes',
      };
      const res = mockResponse();
      await postSearchOption(req, res);
      expect(res.redirect).toHaveBeenCalledWith('/location-search');
    });
  });

  describe('getLocationSearch', () => {
    test('Should render the search option page', async () => {
      const req = mockRequest();
      const res = mockResponse();
      await getLocationSearch(req, res);
      expect(res.render).toBeCalledWith('search/location', i18n.search.location);
    });
  });
});
