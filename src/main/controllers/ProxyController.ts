import { FactRequest } from '../interfaces/FactRequest';
import { Response } from 'express';
import { FactApi } from '../utils/FactApi';
import autobind from 'autobind-decorator';
import {hasErrors} from '../utils/validation';

@autobind
export class ProxyController {

  constructor(
    private readonly api: FactApi
  ) { }

  public async getCourtDetails(req: FactRequest, res: Response): Promise<void> {
    const court = await this.api.court(req.params.slug, req.lng);
    hasErrors(court) ? res.render('error', req.i18n.getDataByLanguage(req.lng).error) : res.send(court);
  }


  public async getCourtsByPostcodeServiceArea(req: FactRequest, res: Response): Promise<void> {
    const results = await this.api.postcodeServiceAreaSearch(req.params.postcode, req.params.serviceArea, req.params.action, req.lng);
    hasErrors(results) ? res.render('error', req.i18n.getDataByLanguage(req.lng).error) : res.send(results);
  }

  public async getCourtsByCourtTypes(req: FactRequest, res: Response): Promise<void> {
    const results = await this.api.courtTypesSearch(req.params.courtTypes);
    hasErrors(results) ? res.render('error', req.i18n.getDataByLanguage(req.lng).error) : res.send(results);
  }

}
