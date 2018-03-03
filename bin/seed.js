require('babel-register');
require('babel-polyfill');

const Promise = require('bluebird');

const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const { seedUsers, seedContacts, seedRooms, dropTables } = require('../src/database/util/seeder');

const seedAll = () => {
  return new Promise(async (resolve, reject) => {
    await seedUsers()
    await seedRooms();
    await seedContacts();
    resolve() 
  })
};

const seedOptions = {
  user: seedUsers,
  contact: seedContacts,
  room: seedRooms,
  drop: dropTables,
  all: seedAll,
};

const environment = process.argv.slice(2);

try {
  environment.forEach(async (option) => {
    await seedOptions[option]();
    process.exit()
  });
} catch (e) {
  console.log(`Error fulfilling command(s): ${environment.join(', ')}`);
  process.exit(1);
}
