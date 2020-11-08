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
    enum Catchment {
      National = 'national'
    }
    const serviceAreaData = await this.api.getServiceArea(req.params.serviceArea);
    const courtsData = serviceAreaData.serviceAreaCourts;

    const data: ServiceSearchResults = {
      ...cloneDeep(req.i18n.getDataByLanguage(req.lng)['service-results'])
    };
    for( const court of courtsData ){
      if( court.catchmentType === Catchment.National ){
        data.nameOfCourt = data.nameOfCourt
          .replace('{court-name}', court.courtName);
        data.slug = data.slug
          .replace('{slug}', court.slug);
        data.onlineText = data.onlineText
          .replace('{applyOnline}', serviceAreaData.onlineText);
        data.onlineUrl = data.onlineUrl
          .replace('{applyOnlineUrl}', serviceAreaData.onlineUrl);
      }
    }
    data.hint = data.hint
      .replace('{service-area}', serviceAreaData.name.toLowerCase());
    res.render('service-results', data);
  }
}
