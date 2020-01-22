import supertest from 'supertest';
import app from '../../app';

function hasKeys(received, expectedKeys) {
  const receivedKeys = Object.keys(received);
  expectedKeys.forEach((key) => {
    if (!receivedKeys.includes(key)) {
      throw Error(`there is no ${key}`);
    }
  });
}

describe('test get my profile api', () => {
  test('GET /challenges/1', async () => {
    const res = await supertest(app)
      .delete('/challenges/1')
      .set('x-access-token', `${process.env.TEST_USER_TOKEN}`);
    expect(res.status).toEqual(200);
    hasKeys(res.body, [
      'id',
    ]);
  });
});
