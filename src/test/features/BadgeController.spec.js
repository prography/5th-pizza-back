import supertest from 'supertest';
import app from '../../app';
import { connectDatabase } from '../../models';

beforeAll(() => {
  connectDatabase();
})

describe('test for BadgeController', () => {
  test('getBadges', async () => {
    const res = await supertest(app)
      .get('/badges')
      .set('x-access-token', `${process.env.TEST_USER_TOKEN}`);
    expect(res.status).toEqual(200);
  });
});
