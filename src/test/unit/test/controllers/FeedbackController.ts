// src/test/unit/test/controllers/FeedbackController.ts

// Silence node-config warnings in Jest
process.env.SUPPRESS_NO_CONFIG_WARNING = 'true';

// ---- Mocks ------------------------------------------------------------------
jest.mock('config', () => ({
  get: (key: string) => {
    if (key === 'services.feedback.url') return 'https://func.example.com';
    if (key === 'feedback.api.key') return 'abc123';
    return undefined;
  }
}), { virtual: true });

const mockPost = jest.fn();
jest.mock('axios', () => ({
  __esModule: true,
  default: { post: mockPost },
  post: mockPost
}));

import axios from 'axios';
import { FeedbackController } from '../../../../main/controllers/FeedbackController';

// ---- Helpers ----------------------------------------------------------------
const makeReq = (body: any = {}, home: any = { title: 'Home' }) =>
  ({
    body,
    lng: 'en',
    i18n: { getDataByLanguage: () => ({ home: { ...home } }) }
  } as any);

const makeRes = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res); // chainable
  res.render = jest.fn();
  return res;
};

const axiosPost = (axios as unknown as { post: jest.Mock }).post;

// ---- Tests ------------------------------------------------------------------
describe('FeedbackController', () => {
  const controller = new FeedbackController();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('GET renders feedback page', () => {
    const req = makeReq();
    const res = makeRes();

    controller.get(req, res);

    expect(res.render).toHaveBeenCalledWith('feedback', { title: 'Home' });
  });

  it('POST with empty message returns 400 and message error', async () => {
    const req = makeReq({
      message: '   ',
      follow_up_email: '',
      user_type: 'Citizen',
      user_type_other: '',
      found_info: 'false'
    });
    const res = makeRes();

    await controller.post(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.render).toHaveBeenCalledWith(
      'feedback',
      expect.objectContaining({
        path: '/feedback',
        errors: { message: 'Enter your feedback before submitting.' },
        formValues: req.body
      })
    );
    expect(axiosPost).not.toHaveBeenCalled();
  });

  it('POST with invalid email returns 400 and email error', async () => {
    const req = makeReq({
      message: 'Hi',
      follow_up_email: 'not-an-email',
      user_type: 'Citizen',
      user_type_other: '',
      found_info: 'false'
    });
    const res = makeRes();

    await controller.post(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.render).toHaveBeenCalledWith(
      'feedback',
      expect.objectContaining({
        errors: { email: 'Enter a valid email address.' }
      })
    );
    expect(axiosPost).not.toHaveBeenCalled();
  });

  it('POST success calls Azure and renders home (allow whitespace user_type_other)', async () => {
    axiosPost.mockResolvedValueOnce({ status: 201 });

    const req = makeReq({
      message: '  Thanks  ',
      follow_up_email: '',            // treated as absent
      user_type: 'Citizen',
      user_type_other: '   ',         // controller may or may not coerce to null
      found_info: 'true'              // coerced to boolean true
    });
    const res = makeRes();

    await controller.post(req, res);

    // Inspect the call to avoid brittle exact matching on user_type_other
    expect(axiosPost).toHaveBeenCalledTimes(1);
    const [url, payload, cfg] = axiosPost.mock.calls[0];

    expect(url).toBe('https://func.example.com/api/HttpFeedbackReceiver');
    expect(cfg).toEqual({ headers: { 'x-api-key': 'abc123' } });

    // Common fields
    expect(payload).toEqual(expect.objectContaining({
      user_type: 'Citizen',
      found_info: true,
      message: 'Thanks',
      follow_up_email: null
    }));

    // user_type_other can be null OR whitespace depending on controller impl
    expect(
      payload.user_type_other === null || /^\s*$/.test(String(payload.user_type_other))
    ).toBe(true);

    expect(res.render).toHaveBeenCalledWith(
      'home',
      expect.objectContaining({ feedbackSubmitted: true })
    );
    expect(res.status).not.toHaveBeenCalled();
  });

  it('POST failure: axios throws -> returns 500 and renders feedback with general error', async () => {
    axiosPost.mockRejectedValueOnce(new Error('boom'));

    const req = makeReq({
      message: 'Hello',
      follow_up_email: '',
      user_type: 'Citizen',
      user_type_other: '',
      found_info: 'false'
    });
    const res = makeRes();

    await controller.post(req, res);

    expect(axiosPost).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.render).toHaveBeenCalledWith(
      'feedback',
      expect.objectContaining({
        path: '/feedback',
        errors: { general: 'An error occurred submitting your feedback. Please try again.' },
        formValues: req.body
      })
    );
  });

  it('POST rejects message > 750 chars', async () => {
    const req = makeReq({
      message: 'x'.repeat(751),
      follow_up_email: '',
      user_type: 'Citizen',
      user_type_other: '',
      found_info: 'false'
    });
    const res = makeRes();

    await controller.post(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.render).toHaveBeenCalledWith(
      'feedback',
      expect.objectContaining({
        errors: { message: 'Feedback must be 750 characters or fewer.' }
      })
    );
    expect(axiosPost).not.toHaveBeenCalled();
  });
});
