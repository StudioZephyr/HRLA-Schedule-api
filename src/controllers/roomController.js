import {
  getRooms,
  addRoom
} from '../database/controllers/roomController';

import {
  getTimeslots
} from '../database/controllers/timeslotController';

const getAllRooms = (req, res) => {
  getRooms()
    .then(rooms => {
      res.status(200).send({ result: rooms });
    })
    .catch(err => {
      res.status(500).send({ result: err });
    });
};

const getAllRoomTimeslots = (req, res) => {
  const roomsArr = [];
  getRooms()
    .then(async rooms => {
      for (let i = 0; i < rooms.length; i++) {
        roomsArr[i] = {
          id: rooms[i].id,
          name: rooms[i].name,
          timeslots: [],
        };
        await getTimeslots(roomInfo[i].id)
          .then(timeslots => {
            roomInfo[i].timeslots = timeslots;
          })
          .catch(err => {
            console.log(`Error: ${err.message}`);
          });
      }
      res.status(200).send({ result: roomsArr });
    })
    .catch(err => {
      res.status(500).send({ result: err });
    });
};

const createRoom = (req, res) => {
  addRoom(req.body)
    .then(success => {
      res.status(201).send({ result: success });
    })
    .catch(err => {
      res.status(500).send({ result: err });
    });
};

export { getAllRooms, getAllRoomTimeslots, createRoom };
