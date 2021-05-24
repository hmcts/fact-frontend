import {FactApi} from '../../utils/FactApi';
import {FactRequest} from '../../interfaces/FactRequest';
import {Response} from 'express';
import {isEmpty} from '../../utils/validation';
import {cloneDeep} from 'lodash';
import autobind from 'autobind-decorator';
import {CourtSearchQuery} from '../../interfaces/CourtSearchData';
import {CourtResultsData} from '../../interfaces/CourtResultsData';

@autobind
export class CourtNameSearchController {
  constructor(
    private readonly api: FactApi,
  ) {
  }

  public async get(req: FactRequest, res: Response) {
    const { error, prefix, noResults }  = req.query as CourtSearchQuery;
    const hasError = !isEmpty(error);
    const hasNoResults: boolean = noResults === 'true';
    const data: CourtResultsData = {
      ...cloneDeep(req.i18n.getDataByLanguage(req.lng)['postcode-search']),
      path: '/search-by-prefix',
      actionUrl: `/services/search-by-prefix?prefix=${prefix}`,
      error: hasError,
      hasNoResults: hasNoResults,
      results: []
    };
    if (hasError) {
      data.errorType = error;
    }
    data.results = await this.api.courtPrefixSearch(prefix);
    res.render('search/prefix-search', data);
  }
}
