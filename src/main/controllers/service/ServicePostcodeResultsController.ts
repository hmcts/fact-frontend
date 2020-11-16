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
    const postcode  = req.query.postcode as string;
    const serviceArea  = req.params.serviceArea;
    const baseUrl = `/services/${req.params.service}/${serviceArea}/search-by-postcode`;
    if (isEmpty(postcode)){
      return res.redirect(`${baseUrl}?error=blankPostcode`);
    } else if (!isPostcodeValid(postcode)) {
      return res.redirect(`${baseUrl}?error=invalidPostcode`);
    } else {
      const data: PostcodeSearchData = {
        ...cloneDeep(req.i18n.getDataByLanguage(req.lng)['postcode-results']),
        path: '/courts/near',
        errors: false,
        results: []
      };
      const court = await this.api.postcodeServiceAreaSearch(postcode, serviceArea, req.lng);
      if (court.length === 0) {
        return res.redirect(`${baseUrl}?noResults=true&postcode=${postcode}`);
      }
      data.results = court;
      data.multipleResultsHint = data.multipleResultsHint
        .replace('{total}', court.length.toString())
        .replace('{serviceArea}', serviceArea)
        .replace('{postcode}', postcode);
      return res.render('postcode-results', data);
    }
  }
}
