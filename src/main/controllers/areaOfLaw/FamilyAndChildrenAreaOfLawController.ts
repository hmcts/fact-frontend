import { FactRequest } from '../../interfaces/FactRequest';
import { hasProperty } from '../../utils/validation';
import { PageData } from '../../interfaces/PageData';
import { Response } from 'express';

export class FamilyAndChildrenAreaOfLawController {
  public get(req: FactRequest, res: Response): void {
    res.render('family-and-children-area-of-law', req.i18n.getDataByLanguage(req.lng)['family-and-children-area-of-law']);
  }

  public post(req: FactRequest, res: Response): void {
    if (!hasProperty(req.body, 'familyAndChildrenAreaOfLaw')) {
      const data: PageData = {
        ...req.i18n.getDataByLanguage(req.lng)['family-and-children-area-of-law'],
        path: '/service-area-childcare-parenting',
        errors: true,
      };
      return res.render('family-and-children-area-of-law', data);
    }

    res.redirect('/');
  }
}
