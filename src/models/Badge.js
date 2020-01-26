import Sequelize from 'sequelize';
import { BaseModel, defaultSetting } from './BaseModel';
import { User } from './User';

export const BadgeType = {
    ContinuousRecording: 'Continuous_recording',
    CycleAccumulativeDistance: 'Cycle_Accumulative_distance',
    CycleAccumulativeTime: 'Cycle_Accumulative_time',
    RunningAccumulativeDistance: 'Running_Accumulative_distance',
    RunningAccumulativeTime: 'Running_Accumulative_time',
    SuccessChallenge: 'Success_Challenge'
}

const uniqueName = 'badgeUnique'

export class Badge extends BaseModel {
  static load(sequelize) {
    // reference 거는 부분이 있으면 User 모델이 생성 된 후에 적용해야한다.
    Badge.init({
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: User,
          key: 'id',
        },
        unique: uniqueName
      },
      type: {
        type: Sequelize.ENUM([
          BadgeType.ContinuousRecording,
          BadgeType.CycleAccumulativeDistance,
          BadgeType.CycleAccumulativeTime,
          BadgeType.RunningAccumulativeDistance,
          BadgeType.RunningAccumulativeTime,
          BadgeType.SuccessChallenge
        ]),
        unique: uniqueName,
      },
      level: {
        type: Sequelize.INTEGER,
        unique: uniqueName,
      }
    }, {
      ...defaultSetting,
      sequelize,
      modelName: 'badge',
    })
  }
  static link(sequelize) {
    Badge.belongsTo(User)
  }
}
