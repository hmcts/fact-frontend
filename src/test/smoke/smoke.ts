const superagent = require('superagent');
const url = process.env.TEST_URL || 'http://localhost:3100';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

describe('Smoke Test', () => {
  describe('healthcheck', () => {
    test('should return status 200', async () => {
      const response = await superagent.get(url);

      expect(response.statusCode).toBe(200);
    });
  });
});
