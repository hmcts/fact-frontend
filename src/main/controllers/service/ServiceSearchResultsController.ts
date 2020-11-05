import { Response } from 'express';
import { FactRequest } from '../../interfaces/FactRequest';

export class ServiceSearchResultsController {
  public get(req: FactRequest, res: Response): void {
    console.log('inside controller');
    res.render('service-results', req.i18n.getDataByLanguage(req.lng)['service-results']);
  }
}
