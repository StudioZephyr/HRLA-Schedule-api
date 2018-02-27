import {
  findAllTimeslots,
  addTimeslot,
  findAllUserTimeslots
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

const createTimeslot = (req, res) => {
  addTimeslot(req.body)
    .then(success => {
      res.status(200).send({ result: success });
    })
    .catch(err => {
      res.status(500).send({ result: err });
    });
};

const getUserTimeslot = (req, res) => {
  findAllUserTimeslots(req.params.id)
    .then(timeslots => {
      res.status(200).send({ result: timeslots });
    })
    .catch(err => {
      res.status(500).send({ result: err });
    });
};

export { getAllTimeslots, createTimeslot, getUserTimeslot };
