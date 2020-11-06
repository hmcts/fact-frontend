import { Response } from 'express';
import { FactRequest } from '../../interfaces/FactRequest';
import { PageData } from '../../interfaces/PageData';
import { cloneDeep } from 'lodash';

export class LocationSearchController {

  public get(req: FactRequest, res: Response): void {
    const data: PageData = {
      ...cloneDeep(req.i18n.getDataByLanguage(req.lng).search.location),
      path: '/search',
    };
    Object.assign(data, req.lng);
    res.render('search/location', data);
  }
}
