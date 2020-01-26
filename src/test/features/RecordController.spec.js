import supertest from 'supertest';
import app from '../../app';
import { connectDatabase } from '../../models';

beforeAll(() => {
  connectDatabase()
})

describe('레코드 테스트', () => {
  test('createRecord', async () => {
    const payload = {
      user_id: Number(process.env.TEST_USER_ID),
      challenge_id: Number(process.env.TEST_CHALLENGE_ID),
      running_time: 30,
      distance: 1000,
      screenshot: 'sampleImage'
    }
    const res = await supertest(app)
      .post('/records')
      .set('x-access-token', `${process.env.TEST_USER_TOKEN}`)
      .send(payload);
    expect(res.status).toEqual(200);
    expect(res.body.data).toMatchObject(payload)
  })
  // test('', async () => {
  //   const res = await supertest(app)
  //     .delete(`/challenges/${process.env.TEST_CHALLENGE_ID}`)
  //     .set('x-access-token', `${process.env.TEST_USER_TOKEN}`);
  //   expect(res.status).toEqual(200);
  // })
});
