import Sequelize from 'sequelize';
import {
  BaseModel,
  defaultSetting
} from './BaseModel';
import {
  Challenge
} from './Challenge';

const RoutineType = {
  Daily: 'daily',
  Weekly: 'weekly',
  Monthly: 'monthly'
}

Object.defineProperties(RoutineType, {
  Daily: {
    value: 'daily',
    writable: false,
  },
  Weekly: {
    value: 'weekly',
    writable: false,
  },
  Monthly: {
    value: 'monthly',
    writable: false,
  }
})

const ObjectUnit = {
  Distance: 'distance',
  Time: 'time',
}

Object.defineProperties(ObjectUnit, {
  Distance: {
    value: 'distance',
    writable: false,
  },
  Time: {
    value: 'time',
    writable: false,
  }
})

const ExerciseType = {
  Running: 'running',
  Cycling: 'cycling',
}

Object.defineProperties(ExerciseType, {
  Running: {
    value: 'running',
    writable: false,
  },
  Cycling: {
    value: 'cycling',
    writable: false,
  }
})

export {
  RoutineType,
  ObjectUnit,
  ExerciseType,
};


export class BaseChallenge extends BaseModel {
  static load(sequelize) {
    BaseChallenge.init({
      routineType: {
        type: Sequelize.ENUM(
          RoutineType.Daily,
          RoutineType.Weekly,
          RoutineType.Monthly,
        ),
        allowNull: false,
      },
      objectUnit: {
        type: Sequelize.ENUM(
          ObjectUnit.Distance,
          ObjectUnit.Time,
        ),
        allowNull: false,
      },
      quota: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      exerciseType: {
        type: Sequelize.ENUM(
          ExerciseType.Running,
          ExerciseType.Cycling
        ),
        allowNull: false,
      },
    }, {
      ...defaultSetting,
      sequelize,
      modelName: 'baseChallenge',
    })
  }
  static link() {
    BaseChallenge.hasMany(Challenge)
  }
}
