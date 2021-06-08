import { mockRequest } from '../../../utils/mockRequest';
import { mockResponse } from '../../../utils/mockResponse';
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

  test('Should render the court prefix search page when not searching with prefix', async () => {
    const response: any = { data: []};
    const api: any = {
      courtPrefixSearch: async () => response.data,
    };
    const controller = new CourtPrefixSearchController(api);

    const req = mockRequest(i18n);
    req.query = {
    };
    const res = mockResponse();
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
  });

  test('Should render the court prefix search page when searching with prefix with no results', async () => {
    const response: any = { data: []};
    const api: any = {
      courtPrefixSearch: async () => response.data,
    };
    const controller = new CourtPrefixSearchController(api);

    const req = mockRequest(i18n);
    req.query = {
      prefix: 'X'
    };
    const res = mockResponse();
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
  });
});
