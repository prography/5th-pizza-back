import Sequelize from 'sequelize';
import { User } from './User';
import { Badge } from './Badge';
import { BaseChallenge } from './BaseChallenge';
import { Challenge } from './Challenge';
import { Record } from './Record';

let sequelize = null;

function connectDatabase() {
  sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD, {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      dialect: 'mysql',
      logging: false,
    }
  );
  const models = [User, Badge, Challenge, BaseChallenge, Record];
  models.forEach((model) => {
    model.load(sequelize);
  })
  models.forEach((model) => {
    model.link(sequelize);
  })
}

function getConnection() {
  return sequelize;
}

function sync() {
  if (!sequelize) {
    connectDatabase();
  }
  sequelize.sync();
}

export {
  User,
  Badge,
  BaseChallenge,
  Record,
  Challenge,
  connectDatabase,
  sync,
  getConnection,
}

export default {
  User,
  Badge,
  BaseChallenge,
  Record,
  Challenge,
  connectDatabase,
  sync,
  getConnection
}

