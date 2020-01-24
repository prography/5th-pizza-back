import Sequelize from "sequelize";
import { BaseModel, defaultSetting } from "./BaseModel";
import { BaseChallenge } from "./BaseChallenge";
import { User } from "./User";

export class Challenge extends BaseModel {
 static load(sequelize) {
    Challenge.init({
      start: Sequelize.DATE,
      end: Sequelize.DATE,
      success: Sequelize.BOOLEAN
    }, {
      ...defaultSetting,
      sequelize,
      modelName: 'challenge'
    })
  } 
  static link() {
    Challenge.belongsTo(User);
    Challenge.belongsTo(BaseChallenge);
  }
}
