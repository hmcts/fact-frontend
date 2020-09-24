import { FactRequest } from '../../interfaces/FactRequest';
import { Response } from 'express';
import { isEmpty } from '../../utils/validation';
import { FactApi } from '../../utils/FactApi';
import autobind from 'autobind-decorator';
import { SearchResultsData } from '../../interfaces/SearchResultsData';

@autobind
export class SearchResultsController {

  constructor(
    private readonly api: FactApi
  ) { }

  public async get(req: FactRequest, res: Response): Promise<void> {
    const query: string = req.query.search as string;
    const data: SearchResultsData = {
      ...req.i18n.getDataByLanguage(req.lng).search.location,
      path: '/search-for-location',
      results: [],
      search: query,
      errors: false,
    };

    if (!isEmpty(query)) {
      const courts = await this.api.search(query);

      if (courts.length > 0) {
        data.results = courts;
        data.foundResults = data.foundResults
          .replace('{total}', data.results.length.toString())
          .replace('{search}', data.search);
      }
    } else {
      data.errors = true;
    }

    res.render('search/location', data);
  }

}
