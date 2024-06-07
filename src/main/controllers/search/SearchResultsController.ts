import { FactRequest } from '../../interfaces/FactRequest';
import { Response } from 'express';
import { FactApi } from '../../utils/FactApi';
import autobind from 'autobind-decorator';
import { SearchCourtHistoryResult, SearchResultsData } from '../../interfaces/SearchResultsData';
import { cloneDeep } from 'lodash';

@autobind
export class SearchResultsController {

  constructor(
    private readonly api: FactApi
  ) { }
  /**
   * GET /courts
   * @returns renders the search results page if results found otherwise renders search location page
   */
  public async get(req: FactRequest, res: Response): Promise<void> {
    const query = req.query.search as string;
    const data: SearchResultsData = {
      ...cloneDeep(req.i18n.getDataByLanguage(req.lng).search.location),
      path: '/courts',
      results: [],
      search: query,
      courtHistoryFlag: true, //placeholder for feature flag
    };

    if (query === '') {
      data.error = data.errorBlank;
    }
    else if (query && query.length < 3) {
      data.error = data.errorTooShort;
    }
    else {
      const courts = await this.api.search(query, req.lng);

      if (courts.length > 0) {
        data.results = courts;
        data.foundResults = data.foundResults
          .replace('{total}', data.results.length.toString())
          .replace('{search}', data.search);
        data.foundResult = data.foundResult
          .replace('{search}', data.search);
      }

      const courtHistory: SearchCourtHistoryResult = await this.api.searchCourtNameHistory(query, req.lng);
      if (courtHistory.slug) {
        data.courtHistory = courtHistory;
      }
    }
    res.render('search/location', data);
  }

}
