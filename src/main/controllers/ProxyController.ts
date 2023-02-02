import { FactRequest } from '../interfaces/FactRequest';
import { Response } from 'express';
import { FactApi } from '../utils/FactApi';
import autobind from 'autobind-decorator';

@autobind
export class ProxyController {

  constructor(
    private readonly api: FactApi
  ) { }

  public async getCourtDetails(req: FactRequest, res: Response): Promise<void> {
    const court = await this.api.court(req.params.slug, req.lng);
    res.send(court);
  }


  public async getCourtsByPostcodeServiceArea(req: FactRequest, res: Response): Promise<void> {
    const results = await this.api.postcodeServiceAreaSearch(req.params.postcode, req.params.serviceArea, req.params.action, req.lng);
    res.send(results);
  }

  public async getCourtsByCourtTypes(req: FactRequest, res: Response): Promise<void> {
    const results = await this.api.courtTypesSearch(req.params.courtTypes);
    res.send(results);
  }
}
