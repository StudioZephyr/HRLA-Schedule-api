import Sequelize from 'sequelize';

import { db } from '../index';
import { User } from './user';

const Contact = db.define('Contact', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
});

Contact.belongsTo(User, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
User.hasMany(Contact);

export { Contact };
