import { Response } from 'express';
import { FactRequest } from '../interfaces/FactRequest';
import axios from 'axios';
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
    const errors: Record<string, string> = {};

    // Validate required fields
    if (!body.message || body.message.trim() === '') {
      errors.message = 'Enter your feedback before submitting.';
    }

    if (Object.keys(errors).length > 0) {
      const data: PageData = {
        ...cloneDeep(req.i18n.getDataByLanguage(req.lng).home),
        path: '/feedback',
        errors,
        formValues: {
          ...body
        }
      };
      return res.status(400).render('feedback', data);
    }

    // Build payload
    const feedbackPayload = {
      user_type: body.user_type,
      user_type_other: body.user_type_other || null,
      found_info: body.found_info === 'true',
      message: body.message
    };

    try {
      await axios.post(
        'http://localhost:7071/api/HttpFeedbackReceiver',
        feedbackPayload,
        {
          headers: {
            'x-api-key': '<add>'
          }
        }
      );
      const data = req.i18n.getDataByLanguage(req.lng).home;
      data.feedbackSubmitted = true;
      console.log(data);
      res.render('home', data);
    } catch (error) {
      console.error('Error sending feedback:', error);
      const data: PageData = {
        ...cloneDeep(req.i18n.getDataByLanguage(req.lng).home),
        path: '/feedback',
        errors: { general: 'An error occurred while submitting your feedback. Please try again.' },
        formValues: {
          ...body
        }
      };
      res.status(500).render('feedback', data);
    }
  }
}
