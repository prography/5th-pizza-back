import Sequelize from 'sequelize';
import { BaseModel, defaultSetting } from './BaseModel';

export class Record extends BaseModel {
  static load(sequelize) {
    super.init({
      userId: Sequelize.INTEGER,
      challengeId: Sequelize.INTEGER,
      runningTime: Sequelize.DOUBLE,
      distance: Sequelize.DOUBLE,
      screenshot: Sequelize.STRING
    }, {
      ...defaultSetting,
      sequelize,
      modelName: 'record'
    })
  }
}
