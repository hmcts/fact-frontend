import { Response } from 'express';
import { FactRequest } from '../../interfaces/FactRequest';
import autobind from 'autobind-decorator';
import { FactApi } from '../../utils/FactApi';
import { cloneDeep } from 'lodash';
import { ServiceSearchResults } from '../../interfaces/ServiceSearchResults';
import { Catchment } from '../../utils/Catchment';

@autobind
export class ServiceSearchResultsController {
  constructor(private readonly api: FactApi) {}
  /**
   * GET /get
   * @returns redirects to the search for service page with results.
   * @param {string} req.params.serviceArea
   * @param {string} req.lng
   */
  public async get(req: FactRequest, res: Response) {
    const data: ServiceSearchResults = {
      ...cloneDeep(req.i18n.getDataByLanguage(req.lng)['service-results']),
      results: {},
      onlineText: '',
      onlineUrl: '',
    };

    const serviceAreaData = await this.api.getServiceArea(
      req.params.serviceArea,
      req.lng,
    );
    for (const court of serviceAreaData.serviceAreaCourts) {
      if (court.catchmentType === Catchment.National) {
        data.results = court;
      }
    }

    data.onlineText = serviceAreaData.onlineText;
    data.onlineUrl = serviceAreaData.onlineUrl;
    if (serviceAreaData.text) {
      data.hint = serviceAreaData.text;
    } else {
      data.hint = data.hint.replace(
        '{service-area}',
        serviceAreaData.name.toLowerCase(),
      );
    }

    res.render('service-results', data);
  }
}
