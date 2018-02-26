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

const updateRoom = (roomObj, id) => {
  return new Promise((resolve, reject) => {
    Room.update(roomObj, {
      where: { id }
    })
      .then(updated => {
        if (updated[0] === 0) {
          reject({
            message: `Room not found`,
            update: false,
          });
        } else {
          resolve('Room Updated');
        }
      })
      .catch(err => {
        console.log(`Error updating Room. Error: ${err}`);
        reject({
          message: `Error updating Room`,
          update: false,
        });
      });
  });
};

export { getRooms, addRoom, updateRoom };
