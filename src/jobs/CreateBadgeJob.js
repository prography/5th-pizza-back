import { BaseChallenge, User, Record } from '../models';
import { BaseJob } from './BaseJob';
import { Op } from 'sequelize';

export class CreateBadgeJob extends BaseJob {
  constructor(userId) {
    super();
    this.userId = userId
    this.user = null;
    this.allRecords = []
    this.cycleRecords = []
    this.runningRecords = []

    this.BadgeType = {
      ContinuousRecording: 'Continuous_recording',
      CycleAccumulativeDistance: 'Cycle_Accumulative_distance',
      CycleAccumulativeTime: 'Cycle_Accumulative_time',
      RunningAccumulativeDistance: 'Running_Accumulative_distance',
      RunningAccumulativeTime: 'Running_Accumulative_time',
      SuccessChallenge: 'Success_Challenge'
    }
  }

  async beforeProcess() {
    this.user = await User.findOne({ where: { id: this.userId } });
    this.allRecords = await Record.findAll({where: {user_id: this.userId}})
    this.cycleRecords = await Record.findAll({ 
      where: {[Op.and]: 
        [{userId: this.userId}, 
        {challengeId: {[Op.in]: (await this.getCycleChallengeId()).map((data) => data.id)}}]
      }})
    this.runningRecords = await Record.findAll({ 
      where: { [Op.and]: 
        [{ userId: this.userId }, 
        {challengeId: { [Op.in]: (await this.getRunningChallengeId()).map((data) => data.id)}}]
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
    if (cycleAccDistance >= 5000){
      const badge = {
        type: this.BadgeType.CycleAccumulativeDistance,
        level: 5
      }
      payloads.push(this.user.createBadge(badge));
    }

    if (cycleAccTime >= 50000){
      const badge = {
        type: this.BadgeType.CycleAccumulativeTime,
        level: 5
      }
      payloads.push(this.user.createBadge(badge));
    }
    return Promise.all(payloads);
  }
  
  async createRunningBadgeByUser() {
    const runningAccDistance = this.accumulateDistance(this.runningRecords)
    const runningAccTime = this.accumulateTime(this.runningRecords)
    const payloads = [];
    if (runningAccDistance >= 3000){
      const badge = {
        type: this.BadgeType.RunningAccumulativeDistance,
        level: 3
      }
      payloads.push(this.user.createBadge(badge));
    }

    if (runningAccTime >= 50000){
      const badge = {
        type: this.BadgeType.RunningAccumulativeTime,
        level: 5
      }
      payloads.push(this.user.createBadge(badge));
    }
    return Promise.all(payloads)
  }
  
  async createContinuousRecordBadgeByUser() {
    const payloads = [];
    const continuousRecord = await this.user.continuousRecord;
    let base = 3;
    const multiply = 3;
    while (continuousRecord / base >= 1){
      const badge = {
        type: this.BadgeType.ContinuousRecording,
        level: base,
      }
      payloads.push(this.user.createBadge(badge));
      base += multiply;
    }
    return Promise.all(payloads);
  }
  
  async createSuccessChallengeBadgeByUser() {
    const payloads = [];
    const successChallengesNumber = (await this.user.getChallenges({ where: { success: true }})).length;
    let base = 0;
    const multiply = 5;
    while (successChallengesNumber / Math.max(base, 1) >= 1) {
      const badge = {
        type: this.BadgeType.SuccessChallenge,
        level: Math.max(base, 1)
      }
      payloads.push(this.user.createBadge(badge));
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
    const cycleChallengeId = BaseChallenge.findAll({where: { exercise_type: 'cycling' }, attributes: ['id']});
    return cycleChallengeId
  }

  getRunningChallengeId(){
    const runningChallengeId = BaseChallenge.findAll({where: { exercise_type: 'running' }, attributes: ['id']});
    return runningChallengeId
  }
}
