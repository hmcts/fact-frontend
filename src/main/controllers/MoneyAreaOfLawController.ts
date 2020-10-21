import { FactRequest } from '../interfaces/FactRequest';
import { hasProperty } from '../utils/validation';
import { PageData } from '../interfaces/PageData';
import { Response } from 'express';

export class MoneyAreaOfLawController {
  public get(req: FactRequest, res: Response): void {
    res.render('money-area-of-law', req.i18n.getDataByLanguage(req.lng)['money-area-of-law']);
  }

  public post(req: FactRequest, res: Response): void {
    if (!hasProperty(req.body, 'moneyAreaOfLaw')) {
      const data: PageData = {
        ...req.i18n.getDataByLanguage(req.lng)['money-area-of-law'],
        path: '/service-area-money',
        errors: true,
      };
      return res.render('money-area-of-law', data);
    }

    res.redirect('/');
  }
}
