import { Response } from 'express';
import { FactRequest } from '../interfaces/FactRequest';

export class AccessibilityStatementController {
  /**
   * GET /get
   * @returns redirects to the accessibility-statement.
   */
  public get(req: FactRequest, res: Response): void {
    res.render(
      'accessibility-statement',
      req.i18n.getDataByLanguage(req.lng)['accessibility-statement'],
    );
  }
}
