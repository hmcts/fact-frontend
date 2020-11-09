import { FactRequest } from '../../interfaces/FactRequest';
import { hasProperty, isObjectEmpty } from '../../utils/validation';
import { Response } from 'express';
import { FactApi } from '../../utils/FactApi';
import autobind from 'autobind-decorator';
import { ServiceAreasData } from '../../interfaces/ServiceAreasData';
import { cloneDeep } from 'lodash';
import { Action } from '../../utils/Action';

@autobind
export class ChooseServiceAreaController {

  constructor(
    private readonly api: FactApi
  ) { }

  private async getServiceData(serviceChosen: string, action: string, serviceAreasPageData: ServiceAreasData, hasErrors: boolean) {
    const data: ServiceAreasData = {
      ...cloneDeep(serviceAreasPageData),
      path: '/services/' + serviceChosen + '/service-areas/' + action,
      results: [],
      errors: hasErrors,
    };

    const serviceAreasData = await this.api.serviceAreas(serviceChosen);
    if (!isObjectEmpty(serviceAreasData)) {
      const serviceData = await this.api.getService(serviceChosen);
      data.results = serviceAreasData;
      data.title = data.title
        .replace('{serviceChosen}', serviceData.name.toLowerCase());
      data.question = data.question
        .replace('{serviceChosen}', serviceData.name.toLowerCase());
      if (hasErrors) {
        data.error.text = data.error.text
          .replace('{serviceChosen}', serviceData.name.toLowerCase());
      }
    }
    return data;
  }

  public async get(req: FactRequest, res: Response) {
    const {service, action} = req.params;
    const serviceAreasPageData = req.i18n.getDataByLanguage(req.lng).service;
    const data = await this.getServiceData(service, action, serviceAreasPageData,false);
    res.render('service', data);
  }

  public async post(req: FactRequest, res: Response) {
    const action = req.params.action as string;
    if (!hasProperty(req.body, 'serviceArea')) {
      const serviceChosen = req.params.service as string;
      const serviceAreasPageData = req.i18n.getDataByLanguage(req.lng).service;
      const serviceData = await this.getServiceData(serviceChosen, action, serviceAreasPageData, true);
      res.render('service', serviceData);
    } else {
      if(req.body.serviceArea === 'not-listed') {
        res.redirect('/services/unknown-service');
      } else if(action === Action.SendDocuments || action === Action.Update || action === Action.NotListed){
        const serviceArea = await this.api.getServiceArea(req.body.serviceArea);
        const courtsInServiceArea = serviceArea.serviceAreaCourts;

        const nationalCourt = courtsInServiceArea.find(court => court.catchmentType === 'national');
        const regionalCourt = courtsInServiceArea.find(court => court.catchmentType === 'regional');

        if(nationalCourt != null) {
          if (action === 'update' || action === 'not-listed') {
            return res.redirect('/services/' + req.params.service + '/' + req.body.serviceArea + '/search-results');
          } else if(action === 'documents'){
            if(regionalCourt === undefined){
              return res.redirect('/services/' + req.params.service + '/' + req.body.serviceArea + '/search-results');
            }
          }
        } else {
          res.redirect('/services/unknown-service');
        }
      } else {
        res.redirect('/services/unknown-service');
      }
    }
  }
}
