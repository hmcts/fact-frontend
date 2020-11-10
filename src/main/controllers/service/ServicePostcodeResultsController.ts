import { Response } from 'express';
import { FactRequest } from '../../interfaces/FactRequest';
import { isEmpty, isPostcodeValid } from '../../utils/validation';

export class ServicePostcodeResultsController {

  public async get(req: FactRequest, res: Response): Promise<void> {
    const postcode: string = req.query.postcode as string;
    if (isEmpty(postcode)){
      return res.redirect(`/services/${req.params.service}/${req.params.serviceArea}/search-by-postcode?error=blankPostcode`);
    } else if (!isPostcodeValid(postcode)) {
      return res.redirect(`/services/${req.params.service}/${req.params.serviceArea}/search-by-postcode?error=invalidPostcode`);
    } else {
      res.render('service-results');
    }
  }
}
