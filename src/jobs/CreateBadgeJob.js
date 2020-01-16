const models = require("../models");
const { Op } = require('sequelize');

exports.CreateBadgeJob = class CreateBadgeJob {
    constructor(userId) {
        this.userId = userId
        this.allRecords = []
        this.cycleRecords = []
        this.runningRecords = []
    }

    async handle() {
        const Records = models.Records;
        this.allRecords = await Records.findAll({where: {user_id: this.userId}})
        this.cycleRecords = await Records.findAll({ 
            where: {[Op.and]: 
                [{user_id: this.userId}, 
                {challenge_id: {[Op.in]: (await this.getCycleChallengeId()).map((data) => data.id)}}]
            }})
        this.runningRecords = await Records.findAll({ 
            where: { [Op.and]: 
                [{ user_id: this.userId }, 
                {challenge_id: { [Op.in]: (await this.getRunningChallengeId()).map((data) => data.id)}}]
            }})
        await this.createBadgeByUser()
    }

    async createBadgeByUser() {
        await this.createCycleBadgeByUser();
        await this.createRunningBadgeByUser();
    }

    async createCycleBadgeByUser() {
        const cycleAccDistance = this.accumulatDistance(this.cycleRecords)
        const cycleAccTime = this.accumulateTime(this.cycleRecords)
        console.log('cycle', cycleAccDistance, cycleAccTime)
        if (cycleAccDistance > 5000){
            const badge = {
                type: 'Cycle_Accumulative_distance',
                level: 5,
                UserId: this.userId
            }
            await models.Badges.create(badge);
        }

        if (cycleAccTime > 50000){
            const badge = {
                type: 'Cycle_Accumulative_time',
                level: 5,
                UserId: this.userId
            }
            await models.Badges.create(badge);
        }
    }
    
    async createRunningBadgeByUser() {
        const runningAccDistance = this.accumulatDistance(this.runningRecords)
        const runningAccTime = this.accumulateTime(this.runningRecords)
        console.log('running', runningAccDistance, runningAccTime)
        if (runningAccDistance > 3000){
            const badge = {
                type: 'Running_Accumulative_distance',
                level: 3,
                UserId: this.userId
            }
            await models.Badges.create(badge);
        }

        if (runningAccTime > 50000){
            const badge = {
                type: 'Running_Accumulative_time',
                level: 5,
                UserId: this.userId
            }
            await models.Badges.create(badge);
        }
    }
    
    createContinousRecordBadgeByUser(records) {
       
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
        const cycleChallengeId = models.BaseChallenges.findAll({where: { exercise_type: 'cycling' }, attributes: ['id']});
        return cycleChallengeId
    }

    getRunningChallengeId(){
        const runningChallengeId = models.BaseChallenges.findAll({where: { exercise_type: 'running' }, attributes: ['id']});
        return runningChallengeId
    }
}
