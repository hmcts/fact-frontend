import { FactRequest } from '../../interfaces/FactRequest';
import { Response } from 'express';
import { hasProperty, isObjectEmpty } from '../../utils/validation';
import { PageData } from '../../interfaces/PageData';
import { AreaOfLawData } from '../../interfaces/AreaOfLawData';
import { FactApi } from '../../utils/FactApi';
import autobind from 'autobind-decorator';

@autobind
export class ChooseAreaOfLawController {

  constructor(
    private readonly api: FactApi
  ) { }

  public async get(req: FactRequest, res: Response) {
    const data: AreaOfLawData = {
      ...req.i18n.getDataByLanguage(req.lng)['choose-area-of-law'],
      path: '/services',
      results: [],
    };

    const areasOfLaw = await this.api.services();
    if (!isObjectEmpty(areasOfLaw)) {
      data.results = areasOfLaw;
    }
    res.render('choose-area-of-law', data);
  }

  public async post(req: FactRequest, res: Response) {
    if (!hasProperty(req.body, 'chooseAreaOfLaw')) {
      const data: PageData = {
        ...req.i18n.getDataByLanguage(req.lng)['choose-area-of-law'],
        path: '/services',
        errors: true,
        results: [],
      };

      const areasOfLaw = await this.api.services();
      if (!isObjectEmpty(areasOfLaw)) {
        data.results = areasOfLaw;
      }
      return res.render('choose-area-of-law', data);
    }

    if (req.body.chooseAreaOfLaw as string === 'money') {
      return res.redirect('/services/money/service-areas');
    } else if (req.body.chooseAreaOfLaw as string === 'probate-divorce-or-ending-civil-partnerships') {
      return res.redirect('/service-area-probate-divorce-civil-partnerships');
    } else if (req.body.chooseAreaOfLaw as string === 'childcare-and-parenting') {
      return res.redirect('/service-area-childcare-parenting');
    }

    res.redirect('/');
  }
}
