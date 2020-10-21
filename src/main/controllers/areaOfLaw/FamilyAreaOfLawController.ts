import { FactRequest } from '../../interfaces/FactRequest';
import { hasProperty } from '../../utils/validation';
import { PageData } from '../../interfaces/PageData';
import { Response } from 'express';

export class FamilyAreaOfLawController {
  public get(req: FactRequest, res: Response): void {
    res.render('family-area-of-law', req.i18n.getDataByLanguage(req.lng)['family-area-of-law']);
  }

  public post(req: FactRequest, res: Response): void {
    if (!hasProperty(req.body, 'familyAreaOfLaw')) {
      const data: PageData = {
        ...req.i18n.getDataByLanguage(req.lng)['family-area-of-law'],
        path: '/service-area-probate-divorce-civil-partnerships',
        errors: true,
      };
      return res.render('family-area-of-law', data);
    }

    res.redirect('/');
  }
}
