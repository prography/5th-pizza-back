const app = require('./app');
const { CreateBadgeJob } = require('./jobs/CreateBadgeJob');
const job = new CreateBadgeJob(1);
job.handle().then(() => {
    process.exit();
}).catch((err) => {
    console.error(err)
});

