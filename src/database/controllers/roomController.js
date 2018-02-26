import Promise from 'bluebird';

import { Room } from '../model/room';

const getRooms = () => {
  return new Promise((resolve, reject) => {
    Room.findAll()
      .then(rooms => {
        const roomArr = [];
        for (let i = 0; i < rooms.length; i++) {
          roomArr.push(rooms[i].dataValues);
        }
        resolve(roomArr);
      })
      .catch(err => {
        console.log(`Error grabbing all Rooms. Error: ${err}`);
        reject({
          message: `Error findaing all Rooms`,
          rooms: false,
        });
      });
  });
};

const addRoom = (roomObj) => {
  return new Promise((resolve, reject) => {
    Room.create(roomObj)
      .then(() => {
        resolve(`Room Created`);
      })
      .catch(err => {
        console.log(`Error creating Room. Error: ${err}`);
        reject({
          message: `Error creating Room`,
          room: false,
        });
      });
  });
};

export { getRooms, addRoom };
