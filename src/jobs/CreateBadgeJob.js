const { BaseJob } = require('./BaseJob');
const models = require("../models");
const { Op } = require('sequelize');

class CreateBadgeJob extends BaseJob {
  constructor(userId) {
    super();
    this.userId = userId
    this.user = null;
    this.allRecords = []
    this.cycleRecords = []
    this.runningRecords = []
  }

  async beforeProcess() {
    this.user = await models.Users.findOne({ where: { id: this.userId } });
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
  }

  async process() {
    await this.createBadgeByUser()
  }

  createBadgeByUser() {
    return Promise.all([
      this.createCycleBadgeByUser(),
      this.createRunningBadgeByUser(),
      this.createContinuousRecordBadgeByUser(),
      this.createSuccessChallengeBadgeByUser(),
    ]);
  }

  async createCycleBadgeByUser() {
    const cycleAccDistance = this.accumulateDistance(this.cycleRecords)
    const cycleAccTime = this.accumulateTime(this.cycleRecords)
    const payloads = [];
    if (cycleAccDistance > 5000){
      const badge = {
        type: 'Cycle_Accumulative_distance',
        level: 5,
        UserId: this.userId
      }
      payloads.push(models.Badges.create(badge));
    }

    if (cycleAccTime > 50000){
      const badge = {
        type: 'Cycle_Accumulative_time',
        level: 5,
        UserId: this.userId
      }
      payloads.push(models.Badges.create(badge));
    }
    return Promise.all(payloads);
  }
  
  async createRunningBadgeByUser() {
    const runningAccDistance = this.accumulateDistance(this.runningRecords)
    const runningAccTime = this.accumulateTime(this.runningRecords)
    const payloads = [];
    if (runningAccDistance > 3000){
      const badge = {
        type: 'Running_Accumulative_distance',
        level: 3,
        UserId: this.userId
      }
      payloads.push(models.Badges.create(badge));
    }

    if (runningAccTime > 50000){
      const badge = {
        type: 'Running_Accumulative_time',
        level: 5,
        UserId: this.userId
      }
      payloads.push(models.Badges.create(badge));
    }
    return Promise.all(payloads)
  }
  
  async createContinuousRecordBadgeByUser() {
    // 오늘부터 과거 30일동안 확인
    // 매일매일 유저의 모델에 연속 기록일 수를 세고 그것만으로 할까 했었는데, 조금 복잡할 것으로 보임
    // 토요일에 내가 마저 하던가, 기록수가 많으면 배지를 주는 걸로 하는게 더 쉽지 않을까 해
  }
  
  async createSuccessChallengeBadgeByUser() {
    const successChallengesNumber = (await this.user.getChallenges({where: { success: true}})).length;
    let base = 0;
    const multiply = 5;
    while (successChallengesNumber / Math.max(base, 1) > 1) {
      const badge = {
        type: 'Success_Challenge',
        level: Math.max(base, 1),
        UserId: this.userId
      }
      payloads.push(models.Badges.create(badge));
      base += multiply;
    }
    return Promise.all(payloads)
  }

  accumulateDistance(records){
    return this.accumulate(records, 'distance');
  }

  accumulateTime(records){
    return this.accumulate(records, 'running_time')
  }

  accumulate(array, field, defaultValue = 0) {
    return array.reduce((acc, item) => acc + item[field], defaultValue);
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

module.exports = { CreateBadgeJob };
