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
    const results = await this.api.postcodeServiceAreaSearch(req.params.postcode, req.params.serviceArea, req.lng);
    res.send(results);
  }
}