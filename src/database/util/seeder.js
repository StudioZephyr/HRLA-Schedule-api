import Promise from 'bluebird';

import { db } from '../index';
import { User } from '../model/user';
import { Room } from '../model/room';
import { Contact } from '../model/contact';
import { Timeslot } from '../model/timeslot';

import { syncDB } from './sync';
import { endianness } from 'os';

const userData = [
  {
    type: 'admin',
    login: 'admin',
    password: 'admin',
    groupName: 'HRLA Admin',
    hasEvent: false,
  },
  {
    type: 'group',
    login: 'group1',
    password: 'group1',
    groupName: 'Group1',
    hasEvent: false,
  },
  {
    type: 'group',
    login: 'group2',
    password: 'group2',
    groupName: 'Group2',
    hasEvent: false,
  }
];

const roomData = [
  {
    name: 'Room 1'
  },
  {
    name: 'Room 2'
  },
  {
    name: 'Room 3'
  },
  {
    name: 'Room 4'
  }
];

const adminContactData = [
  {
    name: "Gab Katz",
    email: "Gab@Katz.com",
  },
  {
    name: "Dan Chong",
    email: "Dan@Chong.com",
  }
];

const timeslots = [
  {
    title: 'test 1',
    start: new Date(2018, 2, 21, 13, 0, 0),
    end: new Date(2018, 2, 21, 14, 0, 0),
    finished: false,
  },
  {
    title: 'test 2',
    start: new Date(2018, 2, 21, 14, 0, 0),
    end: new Date(2018, 2, 5, 15, 30, 0),
    finished: false,
  },
  {
    title: 'test 3',
    start: new Date(2018, 2, 21, 15, 0, 0),
    end: new Date(2018, 2, 21, 17, 0, 0),
    finished: false,
  },
  {
    title: 'test 4',
    start: new Date(2018, 2, 21, 17, 0, 0),
    end: new Date(2018, 2, 21, 20, 0, 0),
    finished: false,
  }


]

const seedUsers = () => {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < userData.length; i++) {
      User.create(userData[i])
        .then(() => {
          console.log(`User, ${userData[i].login}, has been created!`);
          if (i === userData.length - 1) {
            resolve(`All seed Users created`);
          }
        })
        .catch(err => {
          console.log(`Error adding User, ${userData[i].login}! Error: ${err.message}`);
          reject(Error(`Error adding User, ${userData[i].login}!`));
        });
    }
  });
};

const seedRooms = () => {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < roomData.length; i++) {
      Room.create(roomData[i])
        .then(() => {
          console.log(`Room, ${roomData[i].name}, has been created!`);
          resolve();
        })
        .catch(err => {
          console.log(`Error adding Room, ${roomData[i].name}!`);
        });
    }
  })
};

const seedContacts = () => {
  return new Promise((resolve, reject) => {
    User.findOne({
      where: { type: 'admin' }
    })
      .then((user) => {
        for (let i = 0; i < adminContactData.length; i++) {
          adminContactData[i].UserId = user.dataValues.id;
          Contact.create(adminContactData[i])
            .then(() => {
              console.log(`Contact, ${adminContactData[i].name}, has been created!`);
              resolve();
            })
            .catch(err => {
              console.log(`Error adding Contact, ${adminContactData[i].name}!`);
            });
        }
      })
      .catch(err => {
        console.log(`Error finding Admin User. Error: ${err.message}`);
      });
  })
};

const seedTimeslots = () => {
  return new Promise((resolve, reject) => {
    User.findOne({
      where: { type: 'admin' }
    })
      .then((user) => {
        for (let i = 0; i < timeslots.length; i++) {
          let roomIdx = i;
          if (!roomData[i]) {
            roomIdx = 0;
          }
          Room.findOne({
            where: { name: roomData[roomIdx].name }
          })
            .then(async (room) => {
              timeslots[i].UserId = user.dataValues.id;
              timeslots[i].owner = user.dataValues.groupName;
              timeslots[i].RoomId = room.dataValues.id;
              await Timeslot.create(timeslots[i])
              console.log(`Timeslot, ${timeslots[i].title}, has been created!`);
              if (i === roomData.length - 1) {
                resolve();
              }

            })
        }
      })
  })
}

const dropTables = () => {
  return new Promise((resolve, reject) => {
    db.drop({ cascade: true })
      .then(() => {
        console.log(`All data has been dropped!`);
        syncDB(false, resolve);
      })
      .catch(err => {
        console.log(`Error dropping all tables!`);
        reject(err);
      });
  })
};

export { seedUsers, seedRooms, seedContacts, seedTimeslots, dropTables };
