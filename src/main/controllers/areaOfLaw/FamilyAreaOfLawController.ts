import { FactRequest } from '../../interfaces/FactRequest';
import { hasProperty, isObjectEmpty } from '../../utils/validation';
import { PageData } from '../../interfaces/PageData';
import { Response } from 'express';
import { FactApi } from '../../utils/FactApi';
import { FamilyAreaOfLawData } from '../../interfaces/FamilyAreaOfLawData';
import autobind from 'autobind-decorator';

@autobind
export class FamilyAreaOfLawController {

  constructor(
    private readonly api: FactApi
  ) { }

  public async get(req: FactRequest, res: Response) {
    const data: FamilyAreaOfLawData = {
      ...req.i18n.getDataByLanguage(req.lng)['family-area-of-law'],
      path: '/services/probate-divorce-or-ending-civil-partnerships/service-areas',
      results: [],
    };

    const familyAreaOfLaw = await this.api.familyAreaOfLaw();
    if (!isObjectEmpty(familyAreaOfLaw)) {
      data.results = familyAreaOfLaw;
    }
    res.render('family-area-of-law', data);
  }

  public async post(req: FactRequest, res: Response) {
    if (!hasProperty(req.body, 'familyAreaOfLaw')) {
      const data: PageData = {
        ...req.i18n.getDataByLanguage(req.lng)['family-area-of-law'],
        path: '/services/probate-divorce-or-ending-civil-partnerships/service-areas',
        errors: true,
        results: [],
      };

      const familyAreaOfLaw = await this.api.familyAreaOfLaw();
      if (!isObjectEmpty(familyAreaOfLaw)) {
        data.results = familyAreaOfLaw;
      }
      return res.render('family-area-of-law', data);
    }

    res.redirect('/');
  }
}
