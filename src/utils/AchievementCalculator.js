import { Record } from '../models'

const getAchievement = async (challenge, user) => {
    const records = await Record.findAll({ where: { userId: user.id, challengeId: challenge.id } })
    const baseChallenge = await challenge.getBaseChallenge();
    let total = 0;
    let goal = baseChallenge.quota;
    if (baseChallenge.objectUnit === 'time') {
        total = records.reduce((acc, record) => acc + record.runningTime, 0);
    } else {
        total = records.reduce((acc, record) => acc + record.distance, 0)
    }
    return Math.min(Math.round(total / goal * 100), 100)
}

export { 
    getAchievement 
}
