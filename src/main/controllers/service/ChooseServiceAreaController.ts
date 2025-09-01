import { FactRequest } from '../../interfaces/FactRequest';
import { hasProperty, isObjectEmpty } from '../../utils/validation';
import { Response } from 'express';
import { FactApi } from '../../utils/FactApi';
import autobind from 'autobind-decorator';
import { ServiceAreasData } from '../../interfaces/ServiceAreasData';
import { cloneDeep } from 'lodash';
import { ServiceAreaRedirect } from './ServiceAreaRedirect';
import { Action } from '../../utils/Action';

@autobind
export class ChooseServiceAreaController {

  constructor(
    private readonly api: FactApi,
    private readonly serviceAreaRedirect: ServiceAreaRedirect
  ) { }
  /**
   * GET /services/:serviceChosen/service-areas/:action
   * gets and returns the service area data
   @param {string} service
   @param {string} action
   */
  private async getServiceData(serviceChosen: string, action: string, serviceAreasPageData: ServiceAreasData, hasErrors: boolean, lng: string) {
    const data: ServiceAreasData = {
      ...cloneDeep(serviceAreasPageData),
      path: '/services/' + serviceChosen + '/service-areas/' + action,
      results: [],
      errors: hasErrors,
    };

    const serviceAreasData = await this.api.serviceAreas(serviceChosen, lng);
    if (!isObjectEmpty(serviceAreasData)) {
      const serviceData = await this.api.getService(serviceChosen, lng);
      data.results = serviceAreasData;
      data.title = data.title
        .replace('{serviceChosen}', serviceData.name.charAt(0).toUpperCase() + serviceData.name.slice(1).toLowerCase());
      data.question = data.question
        .replace('{serviceChosen}', serviceData.name.toLowerCase());
      data.seoMetadataDescription = data.courtsManaging + serviceData.description.toLowerCase();
      if (hasErrors) {
        data.error.text = data.error.text
          .replace('{serviceChosen}', serviceData.name.toLowerCase());
      }
    }
    return data;
  }
  /**
   * GET /services/:serviceChosen/service-areas/:action
   * @returns renders the chosen service area page
   * @param {string} service
   * @param {string} action
   */
  public async get(req: FactRequest, res: Response) {
    const {service, action} = req.params;
    if (!this.isValidAction(action)) {
      return res.redirect('/not-found');
    }
    const serviceAreasPageData = req.i18n.getDataByLanguage(req.lng).service;
    const data = await this.tryGetServiceData(service, action, serviceAreasPageData, false, req.lng, res);
    if (!data) return;

    res.render('service', data);
    if(data.results.length === 1){
      req.body.serviceArea = data.results[0].slug;
      await this.post(req, res);
    } else {
      res.render('service', data);
    }
  }
  /**
   * POST /services/:serviceChosen/service-areas/:action
   * @returns re-render the chosen service area page
   * @param {string} serviceArea
   * @param {string} action
   */
  public async post(req: FactRequest, res: Response) {
    const action = req.params.action as Action;
    if (!this.isValidAction(action)) {
      return res.redirect('/not-found');
    }
    if (!hasProperty(req.body, 'serviceArea')) {
      const serviceChosen = req.params.service;
      const serviceAreasPageData = req.i18n.getDataByLanguage(req.lng).service;
      const serviceData = await this.tryGetServiceData(serviceChosen, action, serviceAreasPageData, true, req.lng, res);
      if (!serviceData) return;

      res.render('service', serviceData);
    } else if (req.body.serviceArea === 'not-listed') {
      res.redirect('/services/' + action);
    } else {
      const serviceArea = await this.api.getServiceArea(req.body.serviceArea, req.lng);
      const url = this.serviceAreaRedirect.getUrl(req.params.service, serviceArea, action);

      res.redirect(url);
    }
  }

  /**
   * Checks if the action is valid according to the Action enum
   * @param {string} action
   * @returns {boolean} if action is valid
   */
  private isValidAction(action: string): boolean {
    for (const validAction of Object.values(Action)) {
      if (action === validAction) {
        return true;
      }
    }
    return false;
  }

  private async tryGetServiceData(
    serviceChosen: string,
    action: string,
    serviceAreasPageData: ServiceAreasData,
    hasErrors: boolean,
    lng: string,
    res: Response
  ) {
    try {
      return await this.getServiceData(serviceChosen, action, serviceAreasPageData, hasErrors, lng);
    } catch (error) {
      res.redirect('/not-found');
      return null;
    }
  }

}
