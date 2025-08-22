import config from 'config';
import { Response } from 'express';
import { FactRequest } from '../interfaces/FactRequest';
import axios from 'axios';
import { cloneDeep } from 'lodash';

const FUNCTION_URL = `${config.get('services.feedback.url')}/api/HttpFeedbackReceiver`;
const API_KEY      = `${config.get('feedback.api.key')}`;

/** Validate feedback message */
function validateMessage(message: any) {
  const errors: Record<string, string> = {};
  if (typeof message !== 'string' || !message.trim()) {
    errors.message = 'Enter your feedback before submitting.';
  } else if (message.length > 750) {
    errors.message = 'Feedback must be 750 characters or fewer.';
  }
  return errors;
}

/** Validate optional email: must be well-formed if present */
function validateEmail(email: any) {
  if (!email) return null;
  // simple RFC-like email check
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email) ? null : 'Enter a valid email address.';
}

/** POST to Azure Function */
async function sendToAzure(payload: unknown) {
  await axios.post(FUNCTION_URL, payload, {
    headers: { 'x-api-key': API_KEY }
  });
}

export class FeedbackController {
  public get(req: FactRequest, res: Response): void {
    res.render('feedback', req.i18n.getDataByLanguage(req.lng).home);
  }

  public async post(req: FactRequest, res: Response): Promise<void> {
    console.log(FUNCTION_URL);
    console.log(API_KEY);

    const { message, follow_up_email, user_type, user_type_other, found_info } = req.body;
    const pageBase = cloneDeep(req.i18n.getDataByLanguage(req.lng).home);

    const messageErrors = validateMessage(message);
    const emailError    = validateEmail(follow_up_email);

    const errors        = { ...messageErrors };
    if (emailError) errors.email = emailError;

    if (Object.keys(errors).length) {
      return res
        .status(400)
        .render('feedback', {
          ...pageBase,
          path: '/feedback',
          errors,
          formValues: req.body
        });
    }

    const payload = {
      user_type,
      user_type_other: user_type_other || null,
      found_info: found_info === 'true',
      message: message.trim(),
      follow_up_email: follow_up_email?.trim() || null
    };

    try {
      await sendToAzure(payload);
      pageBase.feedbackSubmitted = true;
      res.render('home', pageBase);
    } catch (err) {
      console.error('Error sending feedback:', err);
      res
        .status(500)
        .render('feedback', {
          ...pageBase,
          path: '/feedback',
          errors: { general: 'An error occurred submitting your feedback. Please try again.' },
          formValues: req.body
        });
    }
  }
}
