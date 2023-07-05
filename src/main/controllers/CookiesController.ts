import { Response } from 'express';
import { FactRequest } from '../interfaces/FactRequest';

export class CookiesController {
  /**
   * GET /get
   * renders the cookie page.
   */
  public get(req: FactRequest, res: Response): void {
    res.render('cookies', req.i18n.getDataByLanguage(req.lng)['cookies']);
  }
}
