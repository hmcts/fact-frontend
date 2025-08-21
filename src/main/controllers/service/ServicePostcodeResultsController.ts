import { Response } from 'express';
import { FactRequest } from '../../interfaces/FactRequest';
import { cloneDeep } from 'lodash';
import { isPostcodeValid } from '../../utils/validation';
import { FactApi } from '../../utils/FactApi';
import autobind from 'autobind-decorator';
import {
  PostcodeResultsData,
  CourtWithDistanceResultsData,
} from '../../interfaces/PostcodeResultsData';

@autobind
export class ServicePostcodeResultsController {
  constructor(private readonly api: FactApi) {}
  /**
   * GET /getCourtResultsByPostcode
   * @returns redirect to postcode service results page.
   * @type {string} req.query.postcode
   */
  public async getCourtResultsByPostcode(
    req: FactRequest,
    res: Response,
  ): Promise<void> {
    const postcode = req.query.postcode
      ? (req.query.postcode as string).toLowerCase()
      : '';
    const postcodeError = isPostcodeValid(postcode, '');
    const baseUrl = '/services/search-by-postcode';

    if (postcodeError !== '')
      return res.redirect(`${baseUrl}?error=${postcodeError}`);

    const courts = await this.api.postcodeAreaSearch(postcode, req.lng);
    if (!courts?.length)
      return res.redirect(`${baseUrl}?noResults=true&postcode=${postcode}`);

    const data: CourtWithDistanceResultsData = {
      ...cloneDeep(req.i18n.getDataByLanguage(req.lng)['postcode-results']),
      path: '/courts/near',
      errors: false,
      postcodeOnlySearch: true,
      results: {
        courts: courts,
      },
    };

    data.postcodeSearchResultsHint = data.postcodeSearchResultsHint
      .replace('{total}', courts.length.toString())
      .replace('{postcode}', postcode);
    return res.render('postcode-results', data);
  }
  /**
   * GET /get
   * redirects to the service results page
   * @param {string} serviceArea
   * @param {string} action
   * @query postcode String,
   */
  public async get(req: FactRequest, res: Response): Promise<void> {
    const postcode = req.query.postcode
      ? (req.query.postcode as string).toUpperCase()
      : '';
    const serviceArea = req.params.serviceArea;
    const action = req.params.action;

    const baseUrl = `/services/${req.params.service}/${serviceArea}/${action}/search-by-postcode`;

    const postcodeError = isPostcodeValid(postcode, serviceArea);

    if (postcodeError !== '') {
      return res.redirect(`${baseUrl}?error=${postcodeError}`);
    }
    const isDivorceOrCivil = ['divorce', 'civil-partnership'].includes(
      serviceArea,
    );
    const data: PostcodeResultsData = {
      ...cloneDeep(req.i18n.getDataByLanguage(req.lng)['postcode-results']),
      path: '/courts/near',
      errors: false,
      results: {},
      isDivorceOrCivil: isDivorceOrCivil,
      serviceArea: serviceArea,
    };
    const court = await this.api.postcodeServiceAreaSearch(
      postcode,
      serviceArea,
      action,
      req.lng,
    );
    if (!court.courts || court.courts.length === 0) {
      return res.redirect(`${baseUrl}?noResults=true&postcode=${postcode}`);
    }
    data.results = court;
    if (isDivorceOrCivil) {
      data.secondHint = data.secondHint.replace('{postcode}', postcode);
    } else {
      data.multipleResultsHint = data.multipleResultsHint
        .replace('{total}', court.courts.length.toString())
        .replace(
          '{serviceArea}',
          court.name ? court.name.toLowerCase() : court.name,
        )
        .replace('{postcode}', postcode);
      data.singleResultsHint = data.singleResultsHint
        .replace(
          '{serviceArea}',
          court.name ? court.name.toLowerCase() : court.name,
        )
        .replace('{postcode}', postcode);
    }
    return res.render('postcode-results', data);
  }
}
