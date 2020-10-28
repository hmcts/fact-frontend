import { FactRequest } from '../../interfaces/FactRequest';
import { hasProperty, isObjectEmpty } from '../../utils/validation';
import { PageData } from '../../interfaces/PageData';
import { Response } from 'express';
import { FactApi } from '../../utils/FactApi';
import { ChildcareAndParentingAreaOfLawData } from '../../interfaces/ChildcareAndParentingAreaOfLawData';
import autobind from 'autobind-decorator';

@autobind
export class ChildcareAndParentingAreaOfLawController {

  constructor(
    private readonly api: FactApi
  ) { }

  public async get(req: FactRequest, res: Response) {
    const data: ChildcareAndParentingAreaOfLawData = {
      ...req.i18n.getDataByLanguage(req.lng)['childcare-and-parenting-area-of-law'],
      path: '/services/childcare-and-parenting/service-areas',
      results: [],
    };

    const childcareAndParentingAreaOfLaw = await this.api.childcareAndParentingAreaOfLaw();
    if (!isObjectEmpty(childcareAndParentingAreaOfLaw)) {
      data.results = childcareAndParentingAreaOfLaw;
    }
    res.render('childcare-and-parenting-area-of-law', data);
  }

  public async post(req: FactRequest, res: Response) {
    if (!hasProperty(req.body, 'childcareAndParentingAreaOfLaw')) {
      const data: PageData = {
        ...req.i18n.getDataByLanguage(req.lng)['childcare-and-parenting-area-of-law'],
        path: '/services/childcare-and-parenting/service-areas',
        errors: true,
        results: [],
      };

      const childcareAndParentingAreaOfLaw = await this.api.childcareAndParentingAreaOfLaw();
      if (!isObjectEmpty(childcareAndParentingAreaOfLaw)) {
        data.results = childcareAndParentingAreaOfLaw;
      }
      return res.render('childcare-and-parenting-area-of-law', data);
    }

    res.redirect('/');
  }
}
