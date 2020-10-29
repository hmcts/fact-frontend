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

    res.redirect('/services/' + req.body.chooseAreaOfLaw + '/service-areas');
  }
}
