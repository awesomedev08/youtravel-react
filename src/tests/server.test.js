import request from 'supertest';
import app from '../server/index';

describe('POST /search', () => {
  test('responds with json', async (done) => {
    request(app)
      .get('/search')
      .query({
        dDate: '15/10/2019',
        dest: 'Paris',
        rDate: '30/10/2019',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});
