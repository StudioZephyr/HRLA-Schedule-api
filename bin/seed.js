require('babel-register');
require('babel-polyfill');

const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const { seedUsers, seedContacts, seedRooms, dropTables } = require('../src/database/util/seeder');

const seedAll = () => {
  seedUsers()
    .then(() => {
      seedRooms();
      seedContacts();
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
  environment.forEach((option) => {
    seedOptions[option]();
  });
} catch (e) {
  console.log(`Error fulfilling command(s): ${environment.join(', ')}`);
  process.exit(1);
}
