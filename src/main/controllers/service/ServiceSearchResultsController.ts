import { Response } from 'express';
import { FactRequest } from '../../interfaces/FactRequest';
import autobind from 'autobind-decorator';
import { FactApi } from '../../utils/FactApi';
import { cloneDeep } from 'lodash';
import { ServiceSearchResults } from '../../interfaces/ServiceSearchResults';

@autobind
export class ServiceSearchResultsController {

  constructor(
    private readonly api: FactApi
  ) { }

  public async get(req: FactRequest, res: Response) {

    const data: ServiceSearchResults = {
      ...cloneDeep(req.i18n.getDataByLanguage(req.lng)['service-results']),
      results: {},
    };

    const serviceAreaData = await this.api.getServiceArea(req.params.serviceArea);
    data.results = serviceAreaData;
    data.hint = data.hint
      .replace('{service-area}', serviceAreaData.name.toLowerCase());
    res.render('service-results', data);
  }
}
