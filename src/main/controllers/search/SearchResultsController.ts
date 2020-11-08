import { FactRequest } from '../../interfaces/FactRequest';
import { Response } from 'express';
import { FactApi } from '../../utils/FactApi';
import autobind from 'autobind-decorator';
import { SearchResultsData } from '../../interfaces/SearchResultsData';
import { cloneDeep } from 'lodash';

@autobind
export class SearchResultsController {

  constructor(
    private readonly api: FactApi
  ) { }

  public async get(req: FactRequest, res: Response): Promise<void> {
    const query: string = req.query.search as string;
    const data: SearchResultsData = {
      ...cloneDeep(req.i18n.getDataByLanguage(req.lng).search.location),
      path: '/courts',
      results: [],
      search: query,
    };

    if (query === '') {
      data.error = data.errorBlank;
    }
    else if (query && query.length < 3) {
      data.error = data.errorTooShort;
    }
    else {
      const courts = await this.api.search(query);

      if (courts.length > 0) {
        data.results = courts;
        data.foundResults = data.foundResults
          .replace('{total}', data.results.length.toString())
          .replace('{search}', data.search);
      }
    }

    res.render('search/location', data);
  }

}
