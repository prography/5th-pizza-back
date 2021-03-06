import { BaseJob } from './BaseJob';
import { Op } from 'sequelize';
import { getAchievement } from '../utils/AchievementCalculator';
import moment from 'moment';
import { Record } from '../models';

export class CheckDailyUserJob extends BaseJob {
  constructor(user) {
    super();
    this.user = user
  }
  // job 실행 전
  async beforeProcess() {}
  // 실제 동작
  async process() {
    await this.checkHasContinuousRecord()
    await this.checkIsChallengeSuccess()
  }
  // job 실행 후
  async afterProcess() {}
  // 에러 콜백
  async onError(e) {
    console.log(e)
    throw e;
  }

  async checkHasContinuousRecord() {
    const startDate = moment().local().subtract(1, 'd').format('YYYY-MM-DD');
    const endDate = moment().local().format('YYYY-MM-DD');
    const createdAt = {
      [Op.lt]: endDate,
      [Op.gte]: startDate,
    }
    const records = await Record.count({ where: { userId: this.user.id, createdAt } })
    if (records) {
      await this.user.update({
        continuousRecord: this.user.continuousRecord + 1
      });
    } else {
      await this.user.update({
        continuousRecord: 0
      })
    }
  }

  async checkIsChallengeSuccess() {
    const challenges = await this.user.getChallenges({ where: { success: false } });
    for (const challenge of challenges) {
      const achievement = await getAchievement(challenge, this.user)
      if (achievement >= 100) {
        await challenge.update({ success: true });
      }
    }
  }
}
