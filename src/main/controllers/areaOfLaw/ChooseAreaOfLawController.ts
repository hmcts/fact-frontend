import { FactRequest } from '../../interfaces/FactRequest';
import { Response } from 'express';
import { hasProperty } from '../../utils/validation';
import { PageData } from '../../interfaces/PageData';

export class ChooseAreaOfLawController {
  public get(req: FactRequest, res: Response): void {
    res.render('choose-area-of-law', req.i18n.getDataByLanguage(req.lng)['choose-area-of-law']);
  }

  public post(req: FactRequest, res: Response): void {
    if (!hasProperty(req.body, 'chooseAreaOfLaw')) {
      const data: PageData = {
        ...req.i18n.getDataByLanguage(req.lng)['choose-area-of-law'],
        path: '/service-category',
        errors: true,
      };
      return res.render('choose-area-of-law', data);
    }

    if (req.body.chooseAreaOfLaw as string === 'money') {
      return res.redirect('/service-area-money');
    } else if (req.body.chooseAreaOfLaw as string === 'family') {
      return res.redirect('/service-area-probate-divorce-civil-partnerships');
    }

    res.redirect('/');
  }
}
