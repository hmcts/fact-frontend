import {Response} from 'express';
import {FactRequest} from '../interfaces/FactRequest';
import {AuthTestData} from '../interfaces/AuthTestData';
import {FactApi} from '../utils/FactApi';
import autobind from 'autobind-decorator';
import {AuthGen} from '../utils/AuthGen';
import {Logger} from '../interfaces/Logger';

@autobind
export class TestAuthController {

  constructor(
    private readonly api: FactApi,
    private readonly auth: AuthGen,
    private readonly logger: Logger
  ) {
  }

  /**
   * GET /get
   * @returns renders the test page.
   */
  public async get(req: FactRequest, res: Response) {
    const miResult = '';
    let csResult;
    this.logger.info('/get in test controller');
    // try {
    //   miResult = await this.api.secureCallTestMI(this.auth);
    //   this.logger.info('MI Result: ' + miResult);
    // } catch(e) {
    //   // disable for now as it's filling the log
    //   // console.log(e);
    //   this.logger.error(e);
    // }

    try {
      csResult = await this.api.secureCallTestDefaultAzure(this.auth);
      this.logger.info('DAC Result: ' + csResult);
    } catch(e) {
      // disable for now as it's filling the log
      // console.log(e);
      this.logger.error(e);
    }
    this.logger.info('rendering test page');
    const data: AuthTestData = {
      path: '/make-auth-call',
      miAuthResult: miResult,
      csAuthResult: csResult
    };
    res.render('response', data);
  }
}
