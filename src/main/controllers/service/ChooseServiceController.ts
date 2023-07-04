import { FactRequest } from '../../interfaces/FactRequest';
import { Response } from 'express';
import { hasProperty, isObjectEmpty } from '../../utils/validation';
import { ServicesData } from '../../interfaces/ServicesData';
import { FactApi } from '../../utils/FactApi';
import autobind from 'autobind-decorator';
import { cloneDeep } from 'lodash';

@autobind
export class ChooseServiceController {

  constructor(
    private readonly api: FactApi
  ) { }
  /**
   * GET /services
   * gets the service area data
   */
  private async getServices(req: FactRequest, hasErrors: boolean) {
    const action: string = req.params.action;
    const data: ServicesData = {
      ...cloneDeep(req.i18n.getDataByLanguage(req.lng)['choose-service']),
      path: '/services' + action,
      results: [],
      errors: hasErrors,
    };

    const services = await this.api.services(req.lng);
    if (!isObjectEmpty(services)) {
      data.results = services;
    }
    return data;
  }
  /**
   * GET /services
   * renders the service area page
   */
  public async get(req: FactRequest, res: Response) {
    const data = await this.getServices(req, false);
    res.render('choose-service', data);
  }
  /**
   * PUT /services
   * updates the service area data
   */
  public async post(req: FactRequest, res: Response) {
    if (!hasProperty(req.body, 'chooseService')) {
      const data = await this.getServices(req, true);
      return res.render('choose-service', data);
    } else if (req.body.chooseService === 'not-listed') {
      return res.redirect('/services/service-not-found');
    } else {
      const action = req.params.action;
      const serviceChosen = req.body.chooseService;
      return res.redirect('/services/' + serviceChosen + '/service-areas/' + action);
    }
  }
}
