import Sequelize from 'sequelize';
import { User } from './User';
import { Badge } from './Badge';
import { BaseChallenge } from './BaseChallenge';
import { Challenge } from './Challenge';
import { Record } from './Record';

let sequelize = null;

function createConnection() {
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
}

function getConnection() {
  return sequelize;
}

function sync() {
  if (!sequelize) {
    createConnection();
  }
  const models = [User, Badge, Challenge, BaseChallenge, Record];
  models.forEach((model) => {
    model.load(sequelize);
  })
  models.forEach((model) => {
    model.link(sequelize);
  })
}

export {
  User,
  Badge,
  BaseChallenge,
  Record,
  Challenge,
  createConnection,
  sync,
  getConnection,
}

export default {
  User,
  Badge,
  BaseChallenge,
  Record,
  Challenge,
  createConnection,
  sync,
  getConnection
}

