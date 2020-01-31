import { BaseChallenge, User, Record, Badge } from '../models';
import { BadgeType } from '../models/Badge';
import { BaseJob } from './BaseJob';
import { Op } from 'sequelize';
import { ExerciseType } from '../models/BaseChallenge';

export class CreateBadgeJob extends BaseJob {
  constructor(user) {
    super();
    this.user = user;
    this.allRecords = []
    this.cycleRecords = []
    this.runningRecords = []
  }

  async beforeProcess() {
    this.user = await User.findOne({ where: { id: this.user.id } });
    this.allRecords = await Record.findAll({where: { userId: this.user.id }})
    this.cycleRecords = await Record.findAll({ 
      where: {[Op.and]: 
        [{userId: this.user.id}, 
        {challengeId: {[Op.in]: (await this.getCycleChallengeId()).map((data) => data.id)}}]
      }})
    this.runningRecords = await Record.findAll({ 
      where: { [Op.and]: 
        [{ userId: this.user.id }, 
        {challengeId: { [Op.in]: (await this.getRunningChallengeId()).map((data) => data.id)}}]
      }})
  }

  async process() {
    await this.createBadgeByUser()
  }

  async createBadgeByUser() {
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
        type: BadgeType.CycleAccumulativeDistance,
        level: 5
      }
      payloads.push(Badge.upsert({ ...badge, userId: this.user.id }));
    }

    if (cycleAccTime >= 50000){
      const badge = {
        type: BadgeType.CycleAccumulativeTime,
        level: 5
      }
      payloads.push(Badge.upsert({ ...badge, userId: this.user.id }));
    }
    return Promise.all(payloads);
  }
  
  async createRunningBadgeByUser() {
    const runningAccDistance = this.accumulateDistance(this.runningRecords)
    const runningAccTime = this.accumulateTime(this.runningRecords)
    const payloads = [];
    if (runningAccDistance >= 3000){
      const badge = {
        type: BadgeType.RunningAccumulativeDistance,
        level: 3
      }
      payloads.push(Badge.upsert({ ...badge, userId: this.user.id }));
    }

    if (runningAccTime >= 50000){
      const badge = {
        type: BadgeType.RunningAccumulativeTime,
        level: 5
      }
      payloads.push(Badge.upsert({ ...badge, userId: this.user.id }));
    }
    return Promise.all(payloads)
  }
  
  async createContinuousRecordBadgeByUser() {
    const payloads = [];
    const continuousRecord = this.user.continuousRecord;
    let base = 3;
    const multiply = 3;
    while (continuousRecord / base >= 1){
      const badge = {
        type: BadgeType.ContinuousRecording,
        level: base,
      }
      payloads.push(Badge.upsert({ ...badge, userId: this.user.id }));
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
        type: BadgeType.SuccessChallenge,
        level: Math.max(base, 1)
      }
      payloads.push(Badge.upsert({ ...badge, userId: this.user.id }));
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
  
  async getCycleChallengeId(){
    const cycleChallengeId = await BaseChallenge.findAll({where: { exerciseType: ExerciseType.Cycling }, attributes: ['id']});
    return cycleChallengeId
  }

  async getRunningChallengeId(){
    const runningChallengeId = await BaseChallenge.findAll({where: { exerciseType: ExerciseType.Running }, attributes: ['id']});
    return runningChallengeId
  }
}
