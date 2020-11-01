import { FactRequest } from '../../interfaces/FactRequest';
import { hasProperty, isObjectEmpty } from '../../utils/validation';
import { Response } from 'express';
import { FactApi } from '../../utils/FactApi';
import autobind from 'autobind-decorator';
import { ServiceData } from '../../interfaces/ServiceData';
import { cloneDeep } from 'lodash';

@autobind
export class ChooseServiceAreaController {

  constructor(
    private readonly api: FactApi
  ) { }

  private async getServiceData(req: FactRequest, hasErrors: boolean) {
    const serviceChosen: string = req.params.service as string;
    const data: ServiceData = {
      ...cloneDeep(req.i18n.getDataByLanguage(req.lng).service),
      path: '/services/' + serviceChosen + '/service-areas',
      results: [],
      errors: hasErrors,
    };

    const serviceData = await this.api.serviceAreas(serviceChosen);
    if (!isObjectEmpty(serviceData)) {
      data.results = serviceData;
      data.title = data.title
        .replace('{serviceChosen}', serviceChosen.toLowerCase());
      data.question = data.question
        .replace('{serviceChosen}', serviceChosen.toLowerCase());
      if (hasErrors) {
        data.error.text = data.error.text
          .replace('{serviceChosen}', serviceChosen.toLowerCase());
      }
    }
    return data;
  }

  public async get(req: FactRequest, res: Response) {
    const data = await this.getServiceData(req, false);
    res.render('service', data);
  }

  public async post(req: FactRequest, res: Response) {
    if (!hasProperty(req.body, 'serviceArea')) {
      const data = await this.getServiceData(req, true);
      res.render('service', data);
    } else {
      res.redirect('/');
    }
  }

}
