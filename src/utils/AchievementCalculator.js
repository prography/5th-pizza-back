import models from '../models'

const getAchievement = async function (challenge, user) {
    const records = await models.Records.findAll({ where: { user_id: user.id, challenge_id: challenge.id } })
    let total = 0;
    let goal = (await challenge.getBaseChallenge()).quota;
    if (challenge.object_unit === 'time') {
        total = records.reduce((acc, record) => acc + record.running_time, 0);
    } else {
        total = records.reduce((acc, record) => acc + record.distance, 0)
    }
    return Math.min(Math.round(total / goal * 100), 100)
}

export default { 
    getAchievement 
}
