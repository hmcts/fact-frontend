import { Response } from 'express';
import { FactRequest } from '../../interfaces/FactRequest';
import { PageData } from '../../interfaces/PageData';
import { hasProperty } from '../../utils/validation';
import { cloneDeep } from 'lodash';

export class SearchOptionController {
  /**
   * GET /search-option
   * renders the search option page
   */
  public get(req: FactRequest, res: Response): void {
    res.render('search/option', req.i18n.getDataByLanguage(req.lng).search.option);
  }
  /**
   * POST /search-option
   * renders the search option page
   */
  public post(req: FactRequest, res: Response): void {
    if (!hasProperty(req.body, 'knowLocation')) {
      const data: PageData = {
        ...cloneDeep(req.i18n.getDataByLanguage(req.lng).search.option),
        path: '/search-option',
        errors: true,
      };
      return res.render('search/option', data);
    }
    const knowLocation = req.body.knowLocation as string;
    if (knowLocation === 'yes') {
      return res.redirect('/search-by-name');
    }
    else if (knowLocation === 'no') {
      return res.redirect('/service-choose-action');
    }
    res.redirect('/services/search-by-postcode' );
  }
}
