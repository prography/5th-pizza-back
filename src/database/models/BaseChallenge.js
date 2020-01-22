import Sequelize from 'sequelize';
import { BaseModel, defaultSetting } from './BaseModel';
import { Challenge } from './Challenge';

export class BaseChallenge extends BaseModel {
  static load(sequelize) {
    BaseChallenge.init({
      routineType: Sequelize.ENUM('daily', 'weekly', 'monthly'),
      objectUnit: Sequelize.ENUM('distance', 'time'),
      quota: Sequelize.DOUBLE,
      exerciseType: Sequelize.ENUM('running', 'cycling'),
    }, {
      ...defaultSetting,
      sequelize,
      modelName: 'baseChallenge'
    })
  }
  static link() {
    BaseChallenge.hasMany(Challenge)
  }
}
