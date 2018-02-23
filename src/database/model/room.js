import Sequelize from 'sequelize';

import { db } from '../index';

const Room = db.define('Room', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

export { Room };
