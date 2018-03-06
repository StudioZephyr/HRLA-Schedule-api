import Sequelize from 'sequelize';

const DB_URL = 
  process.env.NODE_ENV === 'development' ? 
  process.env.DEV_DB_URL : 
  process.env.DB_URL;

const db = new Sequelize(DB_URL);


export { db };
