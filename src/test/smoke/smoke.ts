const superagent = require('superagent');
const { config } = require('../config');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

describe('Smoke Test', () => {
  describe('healthcheck', () => {
    test('Test that the frontend health endpoint shows all connected services as being up', async () => {
      const response = await superagent.get(config.TEST_URL + '/health');
      expect(response.statusCode).toBe(200);
      expect(response.body['status']).toBe('UP'); // If the fact-api or MapIt service is down, the overall status will be down
    });
  });
});
