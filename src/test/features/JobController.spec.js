import supertest from 'supertest';
import app from '../../app';
import { connectDatabase } from '../../models';

beforeAll(() => {
  connectDatabase();
})

describe('test for JobController', () => {
  test('run daily-check', async () => {
    const res = await supertest(app)
      .patch('/jobs/daily-check')
      .set('x-access-token', `${process.env.TEST_USER_TOKEN}`);
    expect(res.status).toEqual(200);
  });
});
