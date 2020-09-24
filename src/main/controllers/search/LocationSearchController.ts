import { Response } from 'express';
import { FactRequest } from '../../interfaces/FactRequest';
import { PageData } from '../../interfaces/PageData';

export class LocationSearchController {

  public get(req: FactRequest, res: Response): void {
    const data: PageData = {
      ...req.i18n.getDataByLanguage(req.lng).search.location,
      path: '/location-search',
    };
    res.render('search/location', data);
  }
}
