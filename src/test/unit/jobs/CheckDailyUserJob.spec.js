const { CheckDailyUserJob } = require('../../../jobs/CheckDailyUserJob');
const models = require('../../../models');
const app = require('../../../app');

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