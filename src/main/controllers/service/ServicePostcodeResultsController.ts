import { Response } from 'express';
import { FactRequest } from '../../interfaces/FactRequest';
import { cloneDeep } from 'lodash';
import { isEmpty, isPostcodeValid, postcodeIsNorthernIreland, postcodeIsScottish } from '../../utils/validation';
import { FactApi } from '../../utils/FactApi';
import autobind from 'autobind-decorator';
import { PostcodeResultsData } from '../../interfaces/PostcodeResultsData';

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
    } else if (postcodeIsScottish(postcode)) {
      if (serviceArea === 'childcare-arrangements') {
        return res.redirect(`${baseUrl}?error=scottishChildrenPostcode`);
      }
      return res.redirect(`${baseUrl}?error=scottishPostcode`);
    } else if (postcodeIsNorthernIreland(postcode)) {
      return res.redirect(`${baseUrl}?error=northernIrelandPostcode`);
    } else {
      const isDivorceOrCivil = serviceArea === 'divorce' || serviceArea === 'civil-partnership';
      const data: PostcodeResultsData = {
        ...cloneDeep(req.i18n.getDataByLanguage(req.lng)['postcode-results']),
        path: '/courts/near',
        errors: false,
        results: {},
        isDivorceOrCivil: isDivorceOrCivil,
        serviceArea: serviceArea
      };
      const court = await this.api.postcodeServiceAreaSearch(postcode, serviceArea, req.lng);
      if (!court.courts || court.courts.length === 0) {
        return res.redirect(`${baseUrl}?noResults=true&postcode=${postcode}`);
      }
      data.results = court;
      if (isDivorceOrCivil) {
        data.secondHint = data.secondHint.replace('{postcode}', postcode);
      } else {
        data.multipleResultsHint = data.multipleResultsHint
          .replace('{total}', court.courts.length.toString())
          .replace('{serviceArea}', court.slug ? court.slug.replace('-',' ') : court.slug )
          .replace('{postcode}', postcode);
      }
      return res.render('postcode-results', data);
    }
  }
}
