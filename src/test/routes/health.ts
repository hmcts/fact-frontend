import { expect } from 'chai';
import request from 'supertest';

import { app } from '../../main/app';

describe('Health page', () => {
  describe('on GET', () => {
    test('should return health page', async () => {
      await request(app)
        .get('/health/liveness')
        .expect((res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('status').and.equal('UP');
        });
    });
  });
});
