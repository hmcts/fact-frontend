import { Response } from 'express';
import { FactRequest } from '../../interfaces/FactRequest';
import { cloneDeep } from 'lodash';
import { isPostcodeValid } from '../../utils/validation';
import { FactApi } from '../../utils/FactApi';
import autobind from 'autobind-decorator';
import { PostcodeResultsData } from '../../interfaces/PostcodeResultsData';

@autobind
export class ServicePostcodeResultsController {

  constructor(
    private readonly api: FactApi
  ) { }

  public async getCourtResultsByPostcode(req: FactRequest, res: Response): Promise<void> {
    const postcode  = req.query.postcode? (req.query.postcode as string).toUpperCase() : '';
    const postcodeError = isPostcodeValid(postcode, "");
    const baseUrl = `/services/search-by-postcode`;

    console.log("******* ServicePostcodeResultsController ");
    console.log("****** postcode is: " + postcode);

    if (postcodeError !== '') {
      return res.redirect(`${baseUrl}?error=${postcodeError}`);
    } else {
      const data: PostcodeResultsData = {
        ...cloneDeep(req.i18n.getDataByLanguage(req.lng)['postcode-results']),
        path: '/courts/near',
        errors: false,
        results: {}
      }
      
      const courts = await this.api.postcodeAreaSearch(postcode, req.lng);

      console.log(typeof courts);
      console.log(courts);

      

      

      if (!courts) {
        return res.redirect(`${baseUrl}?noResults=true&postcode=${postcode}`);
      }

      data.results = courts;

      data.multipleResultsHint = data.multipleResultsHint
        .replace('{total}', "derp")
        .replace('{serviceArea}', courts.name ? courts.name.toLowerCase() : courts.name)
        .replace('{postcode}', postcode);
      data.singleResultsHint = data.singleResultsHint
        .replace('{serviceArea}', courts.name ? courts.name.toLowerCase() : courts.name)
        .replace('{postcode}', postcode);

      return res.render('postcode-results', data);
  
    };
  }

  public async get(req: FactRequest, res: Response): Promise<void> {
    const postcode  = req.query.postcode? (req.query.postcode as string).toUpperCase() : '';
    const serviceArea  = req.params.serviceArea;

    const baseUrl = `/services/${req.params.service}/${serviceArea}/search-by-postcode`
    const postcodeError = isPostcodeValid(postcode, serviceArea);

    if (postcodeError !== '') {
      return res.redirect(`${baseUrl}?error=${postcodeError}`);
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
          .replace('{serviceArea}', court.name ? court.name.toLowerCase() : court.name)
          .replace('{postcode}', postcode);
        data.singleResultsHint = data.singleResultsHint
          .replace('{serviceArea}', court.name ? court.name.toLowerCase() : court.name)
          .replace('{postcode}', postcode);
      }

      return res.render('postcode-results', data);
    }
  }
}
