import { FactRequest } from '../../interfaces/FactRequest';
import { Response } from 'express';
import { hasProperty, isObjectEmpty } from '../../utils/validation';
import { ServicesData } from '../../interfaces/ServicesData';
import { FactApi } from '../../utils/FactApi';
import autobind from 'autobind-decorator';
import { cloneDeep } from 'lodash';
const url = require('url');

@autobind
export class ChooseServiceController {

  constructor(
    private readonly api: FactApi
  ) { }

  private async getServices(req: FactRequest, hasErrors: boolean) {
    const data: ServicesData = {
      ...cloneDeep(req.i18n.getDataByLanguage(req.lng)['choose-service']),
      path: '/services',
      results: [],
      errors: hasErrors,
    };

    const services = await this.api.services(req.lng);
    if (!isObjectEmpty(services)) {
      data.results = services;
    }
    return data;
  }

  public async get(req: FactRequest, res: Response) {
    const data = await this.getServices(req, false);
    res.render('choose-service', data);
  }

  public async post(req: FactRequest, res: Response) {
    if (!hasProperty(req.body, 'chooseService')) {
      const data = await this.getServices(req, true);
      return res.render('choose-service', data);
    }

    return res.redirect(url.format({
      pathname: '/services/' + req.body.chooseService + '/service-areas',
      query:req.query
    }));
  }
}
