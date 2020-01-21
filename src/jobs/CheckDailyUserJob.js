const { BaseJob } = require('./BaseJob');
const models = require("../models");
const { Op } = require('sequelize');
const { getAchievement } = require('../utils/AchievementCalculator');
const moment = require('moment');

class CheckDailyUserJob extends BaseJob {
  constructor(user) {
    super();
    this.user = user
  }
    // job 실행 전
  async beforeProcess() {}
  // 실제 동작
  async process() {
    await this.checkHasContinousRecord()
    await this.checkIsChallengeSuccess()
  }
  // job 실행 후
  async afterProcess() {}
  // 에러 콜백
  async onError(e) {
    console.log(e)
    throw e;
  }

  async checkHasContinousRecord() {
    const startDate = moment().subtract(1, 'd').format('YYYY-MM-DD 00:00:00');
    const endDate = moment().format('YYYY-MM-DD 00:00:00');
    const records = await models.Records.count({ where: { user_id: this.user.id, created_at: {
      [Op.and]: [
        {[Op.gte]: startDate},
        {[Op.lte]: endDate},
      ] } } })
    if (records) {
      await this.user.update({ continous_record: this.user.continous_record + 1 });
    } else {
      await this.user.update({ continous_record: 0 })
    }
  }

  async checkIsChallengeSuccess() {
    const challenges = await this.user.getChallenges({ where: { success: false } });
    for (const challenge of challenges) {
      const achivement = await getAchievement(challenge, this.user)
      if (achivement >= 100) {
        await challenge.update({ success: true });
      }
    }
  }
}

module.exports = { CheckDailyUserJob }
