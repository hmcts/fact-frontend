import { mockRequest } from '../../../utils/mockRequest';
import { mockResponse } from '../../../utils/mockResponse';
import { when } from 'jest-when';
import { PageData } from '../../../../../main/interfaces/PageData';
import {CourtPrefixSearchController} from '../../../../../main/controllers/search/CourtPrefixSearchController';

const i18n = {
  search: {
    'prefix-search': {
      error: '',
    }
  }
};

describe('Court Prefix Search Controller', () => {
  test('Should render the court prefix search page when searching with prefix', async () => {
    const response: any = { data: [
      {
        name: 'Yarl\'s Wood Immigration and Asylum Hearing Centre',
        slug: 'yarls-wood-immigration-and-asylum-hearing-centre',
        updatedAt: '11 Feb 2021'
      },
      {
        name: 'Yeovil County, Family and Magistrates\' Court',
        slug: 'yeovil-county-family-and-magistrates-court',
        updatedAt: '26 Feb 2021'
      }
    ]};
    const api: any = {
      courtPrefixSearch: async () => response.data,
    };
    const controller = new CourtPrefixSearchController(api);

    const req = mockRequest(i18n);
    req.query = {
      prefix: 'Y'
    };
    const res = mockResponse();
    await controller.get(req, res);
    const expectedData: PageData = {
      ...i18n.search['prefix-search'],
      path: '/search-by-prefix',
      error: false,
      hasNoResults: false,
      prefix: 'Y',
      results: response.data
    };
    expect(res.render).toBeCalledWith('search/prefix-search', expectedData);
  });

  test('Should render the court prefix search page but not call API when not searching with prefix/prefix undefined', async () => {
    const response: any = { data: []};
    const api: any = {
      courtPrefixSearch: async () => response.data,
    };
    const controller = new CourtPrefixSearchController(api);

    const req = mockRequest(i18n);
    req.query = {
    };
    const res = mockResponse();
    api.courtPrefixSearch = jest.fn();
    await controller.get(req, res);
    const expectedData: PageData = {
      ...i18n.search['prefix-search'],
      path: '/search-by-prefix',
      error: false,
      hasNoResults: false,
      prefix: undefined,
      results: []
    };
    expect(res.render).toBeCalledWith('search/prefix-search', expectedData);
    expect(api.courtPrefixSearch).not.toBeCalled();
  });

  test('Should render the court prefix search page when searching with prefix returns no results', async () => {
    const response: any = { data: []};
    const api: any = {
      courtPrefixSearch: async () => response.data,
    };
    const controller = new CourtPrefixSearchController(api);
    api.courtPrefixSearch = jest.fn();
    const req = mockRequest(i18n);
    req.query = {
      prefix: 'X'
    };
    const res = mockResponse();

    when(api.courtPrefixSearch as jest.Mock).calledWith('X').mockReturnValue([]);

    await controller.get(req, res);
    const expectedData: PageData = {
      ...i18n.search['prefix-search'],
      path: '/search-by-prefix',
      error: false,
      hasNoResults: false,
      prefix: 'X',
      results: []
    };
    expect(res.render).toBeCalledWith('search/prefix-search', expectedData);
    expect(api.courtPrefixSearch).toBeCalledWith('X');
  });

  test('Should render the court prefix search page but not call API when prefix has more than 1 character', async () => {
    const response: any = { data: []};
    const api: any = {
      courtPrefixSearch: async () => response.data,
    };
    const controller = new CourtPrefixSearchController(api);
    api.courtPrefixSearch = jest.fn();
    const req = mockRequest(i18n);
    req.query = {
      prefix: 'XY'
    };
    const res = mockResponse();

    await controller.get(req, res);
    const expectedData: PageData = {
      ...i18n.search['prefix-search'],
      path: '/search-by-prefix',
      error: false,
      hasNoResults: false,
      prefix: 'XY',
      results: []
    };
    expect(res.render).toBeCalledWith('search/prefix-search', expectedData);
    expect(api.courtPrefixSearch).not.toBeCalled();
  });

  test('Should render the court prefix search page but not call API when prefix has less than 1 character', async () => {
    const response: any = { data: []};
    const api: any = {
      courtPrefixSearch: async () => response.data,
    };
    const controller = new CourtPrefixSearchController(api);
    api.courtPrefixSearch = jest.fn();
    const req = mockRequest(i18n);
    req.query = {
      prefix: ''
    };
    const res = mockResponse();

    await controller.get(req, res);
    const expectedData: PageData = {
      ...i18n.search['prefix-search'],
      path: '/search-by-prefix',
      error: false,
      hasNoResults: false,
      prefix: '',
      results: []
    };
    expect(res.render).toBeCalledWith('search/prefix-search', expectedData);
    expect(api.courtPrefixSearch).not.toBeCalled();
  });
});
