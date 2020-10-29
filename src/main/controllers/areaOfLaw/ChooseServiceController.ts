import { FactRequest } from '../../interfaces/FactRequest';
import { Response } from 'express';
import { hasProperty, isObjectEmpty } from '../../utils/validation';
import { PageData } from '../../interfaces/PageData';
import { ServiceData } from '../../interfaces/ServiceData';
import { FactApi } from '../../utils/FactApi';
import autobind from 'autobind-decorator';

@autobind
export class ChooseServiceController {

  constructor(
    private readonly api: FactApi
  ) { }

  public async get(req: FactRequest, res: Response) {
    const data: ServiceData = {
      ...req.i18n.getDataByLanguage(req.lng)['choose-service'],
      path: '/services',
      results: [],
    };

    const areasOfLaw = await this.api.services();
    if (!isObjectEmpty(areasOfLaw)) {
      data.results = areasOfLaw;
    }
    res.render('choose-service', data);
  }

  public async post(req: FactRequest, res: Response) {
    if (!hasProperty(req.body, 'chooseAreaOfLaw')) {
      const data: PageData = {
        ...req.i18n.getDataByLanguage(req.lng)['choose-service'],
        path: '/services',
        errors: true,
        results: [],
      };

      const areasOfLaw = await this.api.services();
      if (!isObjectEmpty(areasOfLaw)) {
        data.results = areasOfLaw;
      }
      return res.render('choose-service', data);
    }

    res.redirect('/services/' + req.body.chooseAreaOfLaw + '/service-areas');
  }
}
