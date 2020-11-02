import { Response } from 'express';
import { FactRequest } from '../../interfaces/FactRequest';

export class UnknownServiceController {
  public get(req: FactRequest, res: Response): void {
    res.render('unknown-service', req.i18n.getDataByLanguage(req.lng).unknownService);
  }
}
