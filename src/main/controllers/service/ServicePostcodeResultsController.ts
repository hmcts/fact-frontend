import { Response } from 'express';
import { FactRequest } from '../../interfaces/FactRequest';
import { cloneDeep } from 'lodash';
import { isEmpty, isPostcodeValid } from '../../utils/validation';
import { FactApi } from '../../utils/FactApi';
import autobind from 'autobind-decorator';
import { PostcodeSearchData } from '../../interfaces/PostcodeSearchData';

@autobind
export class ServicePostcodeResultsController {

  constructor(
    private readonly api: FactApi
  ) { }

  public async get(req: FactRequest, res: Response): Promise<void> {
    const postcode: string = req.query.postcode as string;
    if (isEmpty(postcode)){
      return res.redirect(`/services/${req.params.service}/${req.params.serviceArea}/search-by-postcode?error=blankPostcode`);
    } else if (!isPostcodeValid(postcode)) {
      return res.redirect(`/services/${req.params.service}/${req.params.serviceArea}/search-by-postcode?error=invalidPostcode`);
    } else {
      const aol = req.query.aol as string;
      const serviceAreaType = req.query.serviceAreaType as string;
      const data: PostcodeSearchData = {
        ...cloneDeep(req.i18n.getDataByLanguage(req.lng)['postcode-results']),
        path: '/courts/near',
        errors: false,
        results: []
      };
      if (serviceAreaType === 'Family') {
        console.log('Family TODO');
        data.hint = data.hint.replace('{serviceArea}', req.params.serviceArea);
      } else if (serviceAreaType === 'Civil') {
        console.log('Civil TODO');
      } else {
        data.results = await this.api.postcodeServiceAreaSearch(postcode, aol);
        data.multipleResultsHint = data.multipleResultsHint
          .replace('{total}', data.results.length.toString())
          .replace('{postcode}', postcode);
      }
      return res.render('postcode-results', data);
    }
  }
}
