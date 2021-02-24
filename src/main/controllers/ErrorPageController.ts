import { Response } from 'express';
import { FactRequest } from '../interfaces/FactRequest';

export class ErrorPageController {
  public get(req: FactRequest, res: Response): void {
    res.render('error', req.i18n.getDataByLanguage(req.lng).error);
  }
}
