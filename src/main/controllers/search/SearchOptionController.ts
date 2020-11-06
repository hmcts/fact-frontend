import { Response } from 'express';
import { FactRequest } from '../../interfaces/FactRequest';
import { PageData } from '../../interfaces/PageData';
import { hasProperty } from '../../utils/validation';
import { cloneDeep } from 'lodash';
const url = require('url');

export class SearchOptionController {

  public get(req: FactRequest, res: Response): void {
    res.render('search/option', req.i18n.getDataByLanguage(req.lng).search.option);
  }

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
      return res.redirect(url.format({
        pathname: '/search',
        query:req.query
      }));
    }

    return res.redirect(url.format({
      pathname: '/service-choose-action',
      query:req.query,
    }));
  }
}
