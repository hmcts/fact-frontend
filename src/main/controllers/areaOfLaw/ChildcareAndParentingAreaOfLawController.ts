import { FactRequest } from '../../interfaces/FactRequest';
import { hasProperty } from '../../utils/validation';
import { PageData } from '../../interfaces/PageData';
import { Response } from 'express';

export class ChildcareAndParentingAreaOfLawController {
  public get(req: FactRequest, res: Response): void {
    res.render('childcare-and-parenting-area-of-law', req.i18n.getDataByLanguage(req.lng)['childcare-and-parenting-area-of-law']);
  }

  public post(req: FactRequest, res: Response): void {
    if (!hasProperty(req.body, 'childcareAndParentingAreaOfLaw')) {
      const data: PageData = {
        ...req.i18n.getDataByLanguage(req.lng)['childcare-and-parenting-area-of-law'],
        path: '/service-area-childcare-parenting',
        errors: true,
      };
      return res.render('childcare-and-parenting-area-of-law', data);
    }

    res.redirect('/');
  }
}
