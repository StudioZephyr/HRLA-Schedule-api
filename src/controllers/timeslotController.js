import {
  findAllTimeslots
} from '../database/controllers/timeslotController';

const getAllTimeslots = (req, res) => {
  findAllTimeslots()
    .then(timeslots => {
      res.status(200).send({ result: timeslots });
    })
    .catch(err => {
      res.status(500).send({ result: err });
    });
};

export { getAllTimeslots };
