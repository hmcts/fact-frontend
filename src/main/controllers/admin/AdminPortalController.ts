import autobind from 'autobind-decorator';
import {FactRequest} from '../../interfaces/FactRequest';
import {Response} from 'express';
import config from 'config';

@autobind
export class AdminPortalController {

  public async get(req: FactRequest, res: Response): Promise<void> {
    // Redirect to the courts page on the admin portal
    // This will ask the user to login if they have not done so already
    res.redirect(config.get('services.admin-portal.url') + '/courts');
  }
}
