import { CreateBadgeJob } from '../../../jobs/CreateBadgeJob';
import { connectDatabase } from '../../../models';

describe('test start!', () => {

  beforeAll(() => {
    connectDatabase()
    console.log('Hello! test');
  })

  test('CreateBadgeJob test', async () => {
    const createBadgeJob = new CreateBadgeJob(process.env.TEST_USER_ID);
    console.log('createBadgeJob start');
    await createBadgeJob.run();
    console.log('createBadgeJob end');
  })

  afterAll(() => {
    console.log('Bye! test');
  })
})