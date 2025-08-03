import { Response } from 'express';
import { FactRequest } from '../interfaces/FactRequest';
import axios from 'axios';
import { hasProperty } from '../utils/validation';
import { cloneDeep } from 'lodash';
import { PageData } from '../interfaces/PageData';

export class FeedbackController {

  /**
   * GET /feedback
   * Renders the feedback page.
   */
  public get(req: FactRequest, res: Response): void {
    res.render('feedback', req.i18n.getDataByLanguage(req.lng).home);
  }

  /**
   * POST /feedback
   * Processes feedback form and sends data to Azure Function endpoint.
   */
  public async post(req: FactRequest, res: Response): Promise<void> {
    const body = req.body;

    if (
      !hasProperty(body, 'user_type') ||
      !hasProperty(body, 'found_info') ||
      !hasProperty(body, 'message')
    ) {
      const data: PageData = {
        ...cloneDeep(req.i18n.getDataByLanguage(req.lng).home),
        path: '/feedback',
        errors: true,
        errorMessage: 'Please complete all required fields.'
      };
      return res.render('feedback', data);
    }

    const feedbackPayload = {
      user_type: body.user_type,
      user_type_other: body.user_type_other || null,
      found_info: body.found_info === 'true',
      message: body.message,
      follow_up_email: body.follow_up_email || null,
    };

    try {
      console.log('processed this stuff');
      console.log(feedbackPayload);
      await axios.post(
        'http://localhost:7071/api/HttpFeedbackReceiver',
        feedbackPayload,
        {
          headers: {
            'x-api-key': process.env.FEEDBACK_API_KEY || 'your-fallback-key-here'
          }
        }
      );
      res.redirect('/feedback?submitted=true');
    } catch (error) {
      console.error('Error sending feedback:', error);
      const data: PageData = {
        ...cloneDeep(req.i18n.getDataByLanguage(req.lng).home),
        path: '/feedback',
        errors: true,
        errorMessage: 'An error occurred while submitting your feedback. Please try again.'
      };
      res.status(500).render('feedback', data);
    }
  }
}
