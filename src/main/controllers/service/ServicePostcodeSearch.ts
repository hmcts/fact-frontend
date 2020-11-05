import { FactRequest } from '../../interfaces/FactRequest';
import { Response } from 'express';
import { PageData } from '../../interfaces/PageData';
import { cloneDeep } from 'lodash';
import { isPostcodeValid } from '../../utils/validation';

export class ServicePostcodeSearch {

  public get(req: FactRequest, res: Response): void {
    const data: PageData = {
      ...cloneDeep(req.i18n.getDataByLanguage(req.lng)['postcode-search']),
      path: '/search',
    };
    res.render('postcode-search', data);
  }

  public post(req: FactRequest, res: Response): void {
    const { postcode } = req.body;
    const data: PageData = {
      ...cloneDeep(req.i18n.getDataByLanguage(req.lng)['postcode-search']),
      path: '/search',
      errors: false
    };
    if (isPostcodeValid(postcode)) {
      return res.redirect('/');
    }
    data.errors = true;
    return res.render('postcode-search', data);
  }
}
