import supertest from 'supertest';
import app from '../../app';
import { RoutineType, ObjectUnit, ExerciseType } from '../../models/BaseChallenge';
import { connectDatabase } from '../../models';

beforeAll(() => {
  connectDatabase();
})

describe('test for ChallengeController', () => {
  test('createChallenge', async () => {
    const res = await supertest(app)
      .post('/challenges')
      .set('x-access-token', `${process.env.TEST_USER_TOKEN}`)
      .send({
        routine_type: RoutineType.Daily,
        object_unit: ObjectUnit.Time,
        quota: 300,
        exercise_type: ExerciseType.Running,
      });
    expect(res.status).toEqual(200);
  })
  // test('getChallenges', async () => {
  //   const res = await supertest(app)
  //     .get('/challenges')
  //     .set('x-access-token', `${process.env.TEST_USER_TOKEN}`);
  //   expect(res.status).toEqual(200);
  // });
  // test('getChallenge', async () => {
  //   const res = await supertest(app)
  //     .get('/challenges')
  //     .set('x-access-token', `${process.env.TEST_USER_TOKEN}`);
  //   expect(res.status).toEqual(200);
  // });
  // test('getChallengeRecords', async () => {
  //   const res = await supertest(app)
  //     .get('/challenges')
  //     .set('x-access-token', `${process.env.TEST_USER_TOKEN}`);
  //   expect(res.status).toEqual(200);
  // });
  // test('deleteChallenge', async () => {
  //   const res = await supertest(app)
  //     .delete(`/challenges/${process.env.TEST_CHALLENGE_ID}`)
  //     .set('x-access-token', `${process.env.TEST_USER_TOKEN}`);
  //   expect(res.status).toEqual(200);
  // })
});
