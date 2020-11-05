import { Response } from 'express';
import { FactRequest } from '../../interfaces/FactRequest';
import { PageData } from '../../interfaces/PageData';
import { cloneDeep } from 'lodash';
import { isPostcodeValid } from '../../utils/validation';

export class ServiceSearchResultsController {
  public get(req: FactRequest, res: Response): void {
    const postcode: string = req.query.postcode as string;
    if (isPostcodeValid(postcode)) {
      return res.render('service-results', req.i18n.getDataByLanguage(req.lng)['service-results']);
    }
    const data: PageData = {
      ...cloneDeep(req.i18n.getDataByLanguage(req.lng)['postcode-search']),
      path: '/postcode',
      errors: true
    };
    return res.render('postcode-search', data);
  }
}
