import { Records, Challenges, Badges } from "../models";

class CreateBadgeJob {
    allRecords = []
    cycleRecords = []
    runningRecords = []
    userId = undefined

    constructor(userId) {
        this.userId = userId
    }

    async handle() {
        this.allRecords = await Records.findAll({where: {user_id: this.userId}})
        this.cycleRecords = await Records.findAll({ 
            where: {[Op.and]: 
                [{user_id: this.userId}, 
                {challenge_id: {[Op.or]: getCycleChallengeId()}}]
            }})
        this.runningRecords = await Records.findAll({ 
            where: { [Op.and]: 
                [{ user_id: this.userId }, 
                {challenge_id: { [Op.or]: getRunningChallengeId()}}]
            }})
        this.createBadgeByUser()
    }

    createCycleBadgeByUser() {
        const cycleAccDistance = accumulatDistance(this.cycleRecords)
        const cycleAccTime = accumulateTime(this.cycleRecords)
        if (cycleAccDistance > 5000){
            const badge = {
                type: 'Cycle_Accumulative_distance',
                level: 5,
                userId: this.userId
            }
            Badges.create(badge);
        }

        if (cycleAccTime > 50000){
            const badge = {
                type: 'Cycle_Accumulative_time',
                level: 5,
                userId: this.userId
            }
            Badges.create(badge);
        }
    }
    
    createRunningBadgeByUser() {
        const runningAccDistance = this.accumulatDistance(this.runningRecords)
        const runningAccTime = this.accumulateTime(this.accumulateTime)
        if (runningAccDistance > 3000){
            const badge = {
                type: 'Cycle_Accumulative_distance',
                level: 3,
                userId: this.userId
            }
            Badges.create(badge);
        }

        if (runningAccTime > 50000){
            const badge = {
                type: 'Cycle_Accumulative_time',
                level: 5,
                userId: this.userId
            }
            Badges.create(badge);
        }
    }
    
    createContinousRecordBadgeByUser() {

    }
    
    createSuccessChallengeBadgeByUser() {
        
    }

    accumulatDistance(records){
        const totalDistance = records.reduce((acc, record) => acc + record.distance, 0)
        return totalDistance
    }

    accumulateTime(records){
        const totalTime = records.reduce((acc, record) => acc + record.running_time, 0)
        return totalTime
    }
    
    getCycleChallengeId(){
        const cycleChallengeId = Challenges.findAll({where: { type: 'cycle' }, attributes: ['id']});
        return cycleChallengeId
    }

    getRunningChallengeId(){
        const runningChallengeId = Challenges.findAll({where: { type: 'running' }, attributes: ['id']});
        return runningChallengeId
    }
}
