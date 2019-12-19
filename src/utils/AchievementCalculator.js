const models = require('../models')

const getAchievement = async function (challenge, user) {
    const records = await models.Records.findAll({ where: { user_id: user.id, challenge_id: challenge.id } })
    let total = 0;
    let goal = challenge.quota;
    if (challenge.object_type === 'time') {
        total = records.reduce((acc, record) => acc + record.running_time, 0);
    } else {
        total = records.reduce((acc, record) => acc + record.distance, 0)
    }
    return Math.min(Math.round(total / goal * 100), 100)
}

module.exports = { getAchievement }