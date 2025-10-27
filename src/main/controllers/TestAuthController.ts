import {Response} from 'express';
import {FactRequest} from '../interfaces/FactRequest';
import {AuthTestData} from '../interfaces/AuthTestData';
import {FactApi} from '../utils/FactApi';
import autobind from 'autobind-decorator';
import {AuthGen} from '../utils/AuthGen';

@autobind
export class TestAuthController {

  constructor(
    private readonly api: FactApi,
    private readonly auth: AuthGen
  ) {
  }

  /**
   * GET /get
   * @returns renders the test page.
   */
  public async get(req: FactRequest, res: Response) {
    let miResult;
    let csResult;
    try {
      miResult = await this.api.secureCallTestMI(this.auth);
    } catch(e) {
      console.log(e);
    }

    try {
      csResult = await this.api.secureCallTestCS(this.auth);
    } catch(e) {
      console.log(e);
    }

    const data: AuthTestData = {
      path: '/make-auth-call',
      miAuthResult: miResult,
      csAuthResult: csResult
    };
    res.render('response', data);
  }
}
