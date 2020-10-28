import { FactRequest } from '../../interfaces/FactRequest';
import { hasProperty, isObjectEmpty } from '../../utils/validation';
import { PageData } from '../../interfaces/PageData';
import { Response } from 'express';
import { FactApi } from '../../utils/FactApi';
import { MoneyAreaOfLawData } from '../../interfaces/MoneyAreaOfLawData';
import autobind from 'autobind-decorator';

@autobind
export class MoneyAreaOfLawController {

  constructor(
    private readonly api: FactApi
  ) { }

  public async get(req: FactRequest, res: Response) {
    const data: MoneyAreaOfLawData = {
      ...req.i18n.getDataByLanguage(req.lng)['money-area-of-law'],
      path: '/services/money/service-areas',
      results: [],
    };

    const moneyAreaOfLaw = await this.api.moneyAreaOfLaw();
    if (!isObjectEmpty(moneyAreaOfLaw)) {
      data.results = moneyAreaOfLaw;
    }
    res.render('money-area-of-law', data);
  }

  public async post(req: FactRequest, res: Response) {
    if (!hasProperty(req.body, 'moneyAreaOfLaw')) {
      const data: PageData = {
        ...req.i18n.getDataByLanguage(req.lng)['money-area-of-law'],
        path: '/services/money/service-areas',
        errors: true,
        results: [],
      };

      const moneyAreaOfLaw = await this.api.moneyAreaOfLaw();
      if (!isObjectEmpty(moneyAreaOfLaw)) {
        data.results = moneyAreaOfLaw;
      }
      return res.render('money-area-of-law', data);
    }

    res.redirect('/');
  }
}
