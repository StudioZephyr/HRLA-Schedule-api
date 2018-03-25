import Sequelize from 'sequelize';

import { db } from '../index';
import { User } from './user';
import { Room } from './room';

const Timeslot = db.define('Timeslot', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  start: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  end: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  finished: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  recurring: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  }
});

Timeslot.belongsTo(User, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
Timeslot.belongsTo(Room, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

User.hasMany(Timeslot);
Room.hasMany(Timeslot);

export { Timeslot };
