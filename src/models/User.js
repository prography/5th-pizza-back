import Sequelize from 'sequelize';
import { BaseModel, defaultSetting } from './BaseModel';
import { Challenge } from './Challenge';
import { Badge } from './Badge';

const UserType = {
  Kakao: 'kakao',
  Google: 'google',
  Facebook: 'facebook',
  Naver: 'naver',
}

Object.defineProperties(UserType, {
  Kakao: {
    value: 'kakao',
    writable: false,
  },
  Google: {
    value: 'google',
    writable: false,
  },
  Facebook: {
    value: 'facebook',
    writable: false,
  },
  Naver: {
    value: 'naver',
    writable: false,
  }
})

export {
  UserType,
}

// 현재 구글은 이메일이, 나머지는 user_id 가 unique하게 들어와서 유니크를 걸기가 쉽지 않음
// 이메일과 user_id를 포괄하는 단어로 컬럼을 생성해서 유니크를 걸면 중복되는 유저생성을 방지할 수 있을 것으로 보임
const uniqueName = 'userUnique';

export class User extends BaseModel {
  static load(sequelize) {
    User.init({
      userId: {
        type: Sequelize.STRING,
      },
      nickname: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.ENUM(
          UserType.Kakao,
          UserType.Facebook,
          UserType.Google,
          UserType.Naver,
        )
      },
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
