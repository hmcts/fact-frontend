import { test, expect } from '@playwright/test';
import { config } from '../playwright-e2e/utils/config.utils';

// Checks that the frontend /health endpoint returns 200 OK and overall service status is UP.
test.describe('Smoke Test', () => {
  test('Frontend health endpoint shows all connected services as UP @smoke', async ({
    request,
  }) => {
    const response = await request.get(config.urls.testUrl + '/health', {
      ignoreHTTPSErrors: true,
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.status).toBe('UP');
  });
});
