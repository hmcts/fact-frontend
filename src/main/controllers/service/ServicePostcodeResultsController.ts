import { Response } from 'express';
import { FactRequest } from '../../interfaces/FactRequest';
import { PageData } from '../../interfaces/PageData';
import { cloneDeep } from 'lodash';
import { isPostcodeValid } from '../../utils/validation';
import { FactApi } from '../../utils/FactApi';
import autobind from 'autobind-decorator';

@autobind
export class ServicePostcodeResultsController {

  constructor(
    private readonly api: FactApi
  ) { }

  public async get(req: FactRequest, res: Response): Promise<void> {
    const postcode: string = req.query.postcode as string;
    if (!isPostcodeValid(postcode)) {
      return res.redirect(`/services/${req.params.service}/${req.params.serviceArea}/search-by-postcode?error=true`);
    } else {
      const court = await this.api.postcodeSearch(postcode, req.params.serviceArea);
      const data: PageData = {
        ...cloneDeep(req.i18n.getDataByLanguage(req.lng)['postcode-results']),
        path: '/courts/near',
        errors: true,
        court: court
      };
      return res.render('service-results', data);
    }
  }
}
