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
        .send({ knowLocation: 'yes' })
        .expect((res) => expect(res.status).to.equal(302));
    });

    // TODO this will change in the future when we have other stories implemented
    test('should redirect home page', async () => {
      await request(app)
        .post('/search-option')
        .send({ knowLocation: 'no' })
        .expect((res) => {
          expect(res.status).to.equal(302);
        });
    });

    test('should render the search option if no options was selected', async () => {
      await request(app)
        .post('/search-option')
        .expect((res) => {
          expect(res.status).to.equal(200);
        });
    });
  });

  describe('location search', () => {
    test('should return search location page', async () => {
      await request(app)
        .get('/location-search')
        .expect((res) => expect(res.status).to.equal(200));
    });

    test('should return search location page if no option was selected', async () => {
      await request(app)
        .get('/search-for-location')
        .expect((res) => expect(res.status).to.equal(200));
    });

    test('should return results if london was the query', async () => {
      await request(app)
        .get('/search-for-location?search=london')
        .expect((res) => expect(res.status).to.equal(200));
    });
  });
});
