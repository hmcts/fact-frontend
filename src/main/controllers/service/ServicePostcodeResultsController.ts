import { Response } from 'express';
import { FactRequest } from '../../interfaces/FactRequest';
import { cloneDeep } from 'lodash';
import { isPostcodeValid } from '../../utils/validation';
import { FactApi } from '../../utils/FactApi';
import autobind from 'autobind-decorator';
import { PostcodeSearchData } from '../../interfaces/PostcodeSearch';

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
      const serviceArea = await this.api.getServiceArea(req.params.service, req.params.serviceArea);
      let data: PostcodeSearchData = {
        ...cloneDeep(req.i18n.getDataByLanguage(req.lng)['postcode-results']),
        path: '/courts/near',
        errors: true
      };
      if (court) {
        data = {
          ...data,
          court: court,
          serviceArea: serviceArea
        };
        data.hint = data.hint.replace('{serviceArea}', req.params.serviceArea);
        return res.render('postcode-results', data);
      }
    }
  }
}
