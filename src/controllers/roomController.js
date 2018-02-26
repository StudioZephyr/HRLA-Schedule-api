import {
  getRooms
} from '../database/controllers/roomController';

import {

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

export { getAllRooms };
