import { FactRequest } from '../interfaces/FactRequest';
import { Response } from 'express';
import { FactApi } from '../utils/FactApi';
import { isEmpty } from '../utils/validation';
import autobind from 'autobind-decorator';
import { PageData } from '../interfaces/PageData';

@autobind
export class CourtDetailsController {

  constructor(
      private readonly api: FactApi
  ) { }

  public async get(req: FactRequest, res: Response) {
    const slug: string = req.params.slug as string;
    const data: PageData = {
      ...req.i18n.getDataByLanguage(req.lng)['court-details'],
      path: '/individual-location-pages/courts',
      results: [],
      errors: false,
    };

    if (!isEmpty(slug)) {
      const courts = await this.api.court(slug);
      if (courts) {
        data.results = courts;
      }
    } else {
      data.errors = true;
    }

    res.render('court-details', data);
  }
}
