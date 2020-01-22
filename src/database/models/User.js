import Sequelize from 'sequelize';
import { BaseModel, defaultSetting } from './BaseModel';
import { Challenge } from './Challenge';
import { Badge } from './Badge';

export class User extends BaseModel {
  static load(sequelize) {
    User.init({
      userId: Sequelize.STRING,
      nickname: Sequelize.STRING,
      email: Sequelize.STRING,
      type: Sequelize.ENUM('kakao', 'google', 'facebook', 'naver'),
      continuousRecord: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      }
    }, {
      ...defaultSetting,
      sequelize,
      modelName: 'user'
    })
  }
  static link() {
    User.hasMany(Challenge);
    User.hasMany(Badge);  
  }
}
