import { FactRequest } from '../../interfaces/FactRequest';
import { Response } from 'express';
import { cloneDeep } from 'lodash';
import { PostcodeSearchData } from '../../interfaces/PostcodeSearchData';

export class ServicePostcodeSearchController {

  public get(req: FactRequest, res: Response): void {
    const error: boolean = (req.query.error as string) === 'true';
    const data: PostcodeSearchData = {
      ...cloneDeep(req.i18n.getDataByLanguage(req.lng)['postcode-search']),
      path: '/search-by-postcode',
      actionUrl: `/services/${req.params.service}/${req.params.serviceArea}/courts/near`,
      errors: error
    };
    data.hint = data.hint.replace('{serviceArea}', req.params.serviceArea);
    res.render('postcode-search', data);
  }
}