import { CheckDailyUserJob } from "../jobs/CheckDailyUserJob"
import { CreateBadgeJob } from "../jobs/CreateBadgeJob";
import { User } from "../models";

const runDailyJob = async (req, res) => {
    const users = await User.findAll();
    for (let user of users) {
        const checkDailyUserJob = new CheckDailyUserJob(user);
        const createBadgeJob = new CreateBadgeJob(user);
        await checkDailyUserJob.run();
        await createBadgeJob.run();
    }
    res.send({
        data: 'success'
    })
}

export default {
    runDailyJob
}
