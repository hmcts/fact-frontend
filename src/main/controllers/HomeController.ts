import { Response } from 'express';
import { FactRequest } from '../interfaces/FactRequest';

export class HomeController {
  public get(req: FactRequest, res: Response): void {
    let data = req.i18n.getDataByLanguage(req.lng).home;
    Object.assign(data, req.lng);
    res.render('home', req.i18n.getDataByLanguage(req.lng).home);
  }
}
