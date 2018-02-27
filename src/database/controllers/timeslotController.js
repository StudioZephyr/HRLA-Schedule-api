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

export { getTimeslots };
