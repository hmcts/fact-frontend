import { expect } from 'chai';
import request from 'supertest';

import { app } from '../../main/app';

describe('search', () => {
  describe('search option', () => {
    test('should return search option page', async () => {
      await request(app)
        .get('/search-option')
        .expect((res) => expect(res.status).to.equal(200));
    });

    test('should redirect search location page', async () => {
      await request(app)
        .post('/search-option')
        .send({ knowName: 'yes' })
        .expect((res) => expect(res.status).to.equal(302));
    });

    // TODO this will change in the future when we have other stories implemented
    test('should redirect home page', async () => {
      await request(app)
        .post('/search-option')
        .send({ knowName: 'no' })
        .expect((res) => {
          expect(res.status).to.equal(302);
        });
    });
  });

  describe('search option', () => {
    test('should return search location page', async () => {
      await request(app)
        .get('/search-option')
        .expect((res) => expect(res.status).to.equal(200));
    });
  });
});
