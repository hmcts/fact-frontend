import { Response } from 'express';
import { FactRequest } from '../../interfaces/FactRequest';
import autobind from 'autobind-decorator';
import { FactApi } from '../../utils/FactApi';

@autobind
export class ServiceSearchResultsController {

  constructor(
    private readonly api: FactApi
  ) { }

  public async get(req: FactRequest, res: Response) {
    const courtsData = await this.api.courtsInServiceAreas(req.params.service, req.params.serviceArea);
    const serviceAreaData = await this.api.getServiceArea(req.params.service, req.params.serviceArea);
    for( const court of courtsData ){
      if( court.catchment === 'national' ){
        req.i18n.getDataByLanguage(req.lng)['service-results'].nameOfCourt = req.i18n.getDataByLanguage(req.lng)['service-results'].nameOfCourt
          .replace('{court-name}', court.name);
      }
    }
    req.i18n.getDataByLanguage(req.lng)['service-results'].hint = req.i18n.getDataByLanguage(req.lng)['service-results'].hint
      .replace('{service-area}', serviceAreaData.name.toLowerCase());
    res.render('service-results', req.i18n.getDataByLanguage(req.lng)['service-results']);
  }
}
