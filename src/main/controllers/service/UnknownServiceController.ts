import { Response } from 'express';
import { FactRequest } from '../../interfaces/FactRequest';
import { cloneDeep } from 'lodash';

export class UnknownServiceController {
  /**
   * GET /get
   * render the unknown service page.
   */
  public get(req: FactRequest, res: Response): void {
    const data = {
      ...cloneDeep(req.i18n.getDataByLanguage(req.lng).unknownService)
    };
    res.render('unknown-service', data);
  }
}
