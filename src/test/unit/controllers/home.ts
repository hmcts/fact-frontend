import { getHomePage } from "../../../main/controllers/home";

const i18n = {
  home: '',
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

describe('Home Controller', () => {
  describe('get', () => {
    test('Should render the search option page', async () => {
      const req = mockRequest();
      const res = mockResponse();
      await getHomePage(req, res);
      expect(res.render).toBeCalledWith('home', i18n.home);
    });
  });
});
