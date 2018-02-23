import Sequelize from 'sequelize';

import { db } from '../index';

const User = db.define('User', {
  type: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  login: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  groupName: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  isNew: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
});

export { User };
