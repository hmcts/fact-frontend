import { Response } from 'express';
import { FactRequest } from '../interfaces/FactRequest';

export class NotFoundPageController {
  public get(req: FactRequest, res: Response): void {
    res.render('not-found', req.i18n.getDataByLanguage(req.lng).notFound);
  }
}
