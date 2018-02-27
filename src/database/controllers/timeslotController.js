import Promise from 'bluebird';

import { Timeslot } from '../model/timeslot';

const getTimeslots = (id) => {
  return new Promise((resolve, reject) => {
    Timeslot.findAll({
      where: { 
        RoomId: id,
        finished: false,
      }
    })
      .then(timeslots => {
        const timeslotsArr = [];
        for (let i = 0; i < timeslots.length; i++) {
          timeslotsArr.push(timeslots[i].dataValues);
        }
        resolve(timeslotsArr);
      })
      .catch(err => {
        console.log(`Error finding Timeslots for Room: ${id}. Error: ${err}`);
        reject({
          message: `Error finding timeslots`
        });
      });
  });
};

const findAllTimeslots = () => {
  return new Promise((resolve, reject) => {
    Timeslot.findAll({
      where: { finished: false }
    })
      .then(timeslots => {
        const timeslotArr = [];
        for (let i = 0; i < timeslots.length; i++) {
          timeslotData.push(timeslots[i].dataValues);
        }
        resolve(timeslotArr);
      })
      .catch(err => {
        console.log(`Error finding all Timeslots. Error: ${err}`);
        reject({
          message: `Error finding Timeslots`,
          timeslots: false,
        });
      });
  });
};

export { getTimeslots, findAllTimeslots };
