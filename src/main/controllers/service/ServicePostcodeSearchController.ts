import { FactRequest } from '../../interfaces/FactRequest';
import { Response } from 'express';
import { cloneDeep } from 'lodash';
import { PostcodeSearchData, PostcodeSearchQuery } from '../../interfaces/PostcodeSearchData';
import { isEmpty } from '../../utils/validation';
import { FactApi } from '../../utils/FactApi';
import autobind from 'autobind-decorator';

@autobind
export class ServicePostcodeSearchController {
  constructor(
    private readonly api: FactApi,
  ) { }

  public async getCourtsByPostcodeOnly(req: FactRequest, res: Response) {
    const { error, postcode, noResults }  = req.query as PostcodeSearchQuery;
    const hasError = !isEmpty(error);
    const hasNoResults: boolean = noResults === 'true';
    const data: PostcodeSearchData = {
      ...cloneDeep(req.i18n.getDataByLanguage(req.lng)['postcode-search']),
      path: '/search-by-postcode',
      actionUrl: '/services/courts/near',
      noServiceSearch: true,
      error: hasError,
      hasNoResults: hasNoResults,
      postcode: postcode
    };
    if (hasError) {
      data.errorType = error;
    }
    res.render('postcode-search', data);
  }

  public async get(req: FactRequest, res: Response) {
    const { error, postcode, noResults }  = req.query as PostcodeSearchQuery;
    const hasError = !isEmpty(error);
    const hasNoResults: boolean = noResults === 'true';
    const data: PostcodeSearchData = {
      ...cloneDeep(req.i18n.getDataByLanguage(req.lng)['postcode-search']),
      path: '/search-by-postcode',
      actionUrl: `/services/${req.params.service}/${req.params.serviceArea}/courts/near`,
      error: hasError,
      hasNoResults: hasNoResults,
      serviceAreaIsChildcare: req.params.serviceArea === 'childcare-arrangements',
      postcode: postcode
    };
    if (hasError) {
      data.errorType = error;
    }
    const serviceArea = await this.api.getServiceArea(req.params.serviceArea, req.lng);
    data.hint = data.hint.replace('{serviceArea}', serviceArea.name ? serviceArea.name.toLowerCase() : serviceArea.name);
    res.render('postcode-search', data);
  }
}
