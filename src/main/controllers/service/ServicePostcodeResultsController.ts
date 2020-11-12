import { Response } from 'express';
import { FactRequest } from '../../interfaces/FactRequest';
import { cloneDeep } from 'lodash';
import { isEmpty, isPostcodeValid } from '../../utils/validation';
import { FactApi } from '../../utils/FactApi';
import autobind from 'autobind-decorator';
import { PostcodeSearchData } from '../../interfaces/PostcodeSearchData';
import { PostcodeResultsQuery } from '../../interfaces/PostcodeResultsQuery';

@autobind
export class ServicePostcodeResultsController {

  constructor(
    private readonly api: FactApi
  ) { }

  public async get(req: FactRequest, res: Response): Promise<void> {
    const { aol, serviceAreaType, postcode }  = req.query as PostcodeResultsQuery;
    const baseUrl = `/services/${req.params.service}/${req.params.serviceArea}/search-by-postcode?serviceAreaType=${serviceAreaType}&aol=${aol}`;
    if (isEmpty(postcode)){
      return res.redirect(`${baseUrl}&error=blankPostcode`);
    } else if (!isPostcodeValid(postcode)) {
      return res.redirect(`${baseUrl}&error=invalidPostcode`);
    } else {
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
        const court = await this.api.postcodeServiceAreaSearch(postcode, aol, req.lng);
        if (court.length === 0) {
          return res.redirect(`${baseUrl}&noResults=true&postcode=${postcode}`);
        }
        data.results = court;
        data.multipleResultsHint = data.multipleResultsHint
          .replace('{total}', court.length.toString())
          .replace('{postcode}', postcode);
      }
      return res.render('postcode-results', data);
    }
  }
}
