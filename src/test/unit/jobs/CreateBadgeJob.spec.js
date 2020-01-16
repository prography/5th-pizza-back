const CreateBadgeJob = require('../../../jobs/CreateBadgeJob');

describe('test start!', () => {

  beforeAll(() => {
    console.log('Hello! test');
  })

  test('CreateBadgeJob test', async () => {
    createBadgeJob = new CreateBadgeJob();
    await createBadgeJob.handle();
  })

  afterAll(() => {
    console.log('Bye! test');
  })
})