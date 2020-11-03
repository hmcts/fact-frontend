import { FactRequest } from '../../interfaces/FactRequest';
import { hasProperty, isObjectEmpty } from '../../utils/validation';
import { Response } from 'express';
import { FactApi } from '../../utils/FactApi';
import autobind from 'autobind-decorator';
import { ServiceAreasData } from '../../interfaces/ServiceAreasData';
import { cloneDeep } from 'lodash';

@autobind
export class ChooseServiceAreaController {

  constructor(
    private readonly api: FactApi
  ) { }

  private async getServiceData(req: FactRequest, hasErrors: boolean) {
    const serviceChosen: string = req.params.service as string;
    const data: ServiceAreasData = {
      ...cloneDeep(req.i18n.getDataByLanguage(req.lng).service),
      path: '/services/' + serviceChosen + '/service-areas',
      results: [],
      errors: hasErrors,
    };

    const serviceAreasData = await this.api.serviceAreas(serviceChosen);
    if (!isObjectEmpty(serviceAreasData)) {
      const service = await this.api.getService(serviceChosen);
      data.results = serviceAreasData;
      data.title = data.title
        .replace('{serviceChosen}', service.name.toLowerCase());
      data.question = data.question
        .replace('{serviceChosen}', service.name.toLowerCase());
      if (hasErrors) {
        data.error.text = data.error.text
          .replace('{serviceChosen}', service.name.toLowerCase());
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
      res.redirect('/services/unknown-service');
    }
  }

}
