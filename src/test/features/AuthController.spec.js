import supertest from 'supertest';
import app from '../../app';
import { UserType } from '../../models/User';
import { connectDatabase } from '../../models';

beforeAll(() => {
  connectDatabase();
})

describe('test for UserController', () => {
  test('login/google', async () => {
    const res = await supertest(app)
      .post(`/auth/login/${UserType.Google}`)
      .set('x-social-token', 'test-token');
    expect(res.status).toEqual(200);
  })
  test('login/facebook', async () => {
    const res = await supertest(app)
      .post(`/auth/login/${UserType.Facebook}`)
      .set('x-social-token', 'test-token');
    expect(res.status).toEqual(200);
  })
  test('login/naver', async () => {
    const res = await supertest(app)
      .post(`/auth/login/${UserType.Naver}`)
      .set('x-social-token', 'test-token');
    expect(res.status).toEqual(200);
  })
  test('login/kakao', async () => {
    const res = await supertest(app)
      .post(`/auth/login/${UserType.Kakao}`)
      .set('x-social-token', 'test-token');
    expect(res.status).toEqual(200);
  })
});
