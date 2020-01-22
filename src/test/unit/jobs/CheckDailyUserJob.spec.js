import { CheckDailyUserJob } from '../../../jobs/CheckDailyUserJob';
import models from '../../../models';

describe('test start!', () => {

  beforeAll(() => {
    console.log('Hello! test');
  })

  test('CheckDailyUserJob test', async () => {
    const user = await models.Users.findOne({ where: { id: process.env.TEST_USER_ID }})
    const checkDailyUserJob = new CheckDailyUserJob(user);
    await checkDailyUserJob.run();
  })

  afterAll(() => {
    console.log('Bye! test');
  })
})