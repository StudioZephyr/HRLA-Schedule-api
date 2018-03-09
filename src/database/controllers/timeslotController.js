import Promise from 'bluebird';
import moment from 'moment';

import { Timeslot } from '../model/timeslot';
import { User } from '../model/user';
import { Room } from '../model/room';

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
          timeslotArr.push(timeslots[i].dataValues);
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

const addTimeslot = (timeslotObj) => {
  return new Promise((resolve, reject) => {
    //grabs Room Id to apply on event
    Room.findOne({
      attributes: ['id'],
      where: { name: timeslotObj.room }
    })
      .then(({ id }) => {
        let roomId = id
        //grabs all events in current room
        Timeslot.findAll({
          where: { RoomId: id }
        })
          .then((eventList) => {
            //checks for overlapping events in DB
            let start = moment(timeslotObj.start);
            let end = moment(timeslotObj.end);
            for (let i = 0; i < eventList.length; i++) {
              let event = eventList[i]
              let eStart = moment(event.start);
              let eEnd = moment(event.end);
              if (start.isBetween(eStart, eEnd) || end.isBetween(eStart, eEnd) || eStart.isBetween(start, end) || eEnd.isBetween(start, end)) {
                console.log('ISSUE FOUND IN CREATING TIMESLOT: SPOT TAKEN, SHOULD REJECT')
                reject({ message: `Timeslot already claimed between ${eStart} and ${eEnd}` })
              }
            }
            //grabs User id to apply on event
            User.findOne({
              attributes: ['id'],
              where: { groupName: timeslotObj.username }
            })
              .then(({ id }) => {
                timeslotObj.UserId = id;
                timeslotObj.RoomId = roomId;
                Timeslot.create(timeslotObj)
                  .then((timeSlotResult) => {
                    //updates user.hasEvent to have an existing event
                    User.update({ hasEvent: true }, {
                      where: { id }
                    })
                    .then(()=> {
                      resolve(timeSlotResult);
                    })
                  })
                  .catch(err => {
                    console.log(`Error creating Timeslot`);
                    reject({
                      message: `Error creating Timeslot`,
                      timeslot: false,
                    });
                  });
              })
          })

      })

  });
};

const findAllUserTimeslots = (id) => {
  return new Promise((resolve, reject) => {
    Timeslot.findAll({
      where: {
        UserId: id,
        finished: false,
      }
    })
      .then(timeslots => {
        const timeslotArr = [];
        for (let i = 0; i < timeslots.length; i++) {
          timeslotArr.push(timeslots[i].dataValues);
        }
        resolve(timeslotArr);
      })
      .catch(err => {
        console.log(`Error finding all User Timeslots. Error: ${err}`);
        reject({
          message: `Error finding all User Timeslots`,
          timeslot: false,
        });
      });
  });
};

const updateTimeslot = (timeslotObj, id) => {
  return new Promise((resolve, reject) => {
    Timeslot.findAll({
      where: { RoomId: timeslotObj.RoomId }
    })
      .then((eventList) => {
        let start = moment(timeslotObj.start);
        console.log('looking at start in update', timeslotObj, timeslotObj.start)
        let end = moment(timeslotObj.end);
        console.log('eventlist', eventList)
        for (let i = 0; i < eventList.length; i++) {
          let event = eventList[i]
          let eStart = moment(event.start);
          let eEnd = moment(event.end);
          if ((start.isBetween(eStart, eEnd) || end.isBetween(eStart, eEnd) || eStart.isBetween(start, end) || eEnd.isBetween(start, end)) && event.id !== timeslotObj.id) {
            console.log('ISSUE FOUND IN CREATING TIMESLOT: SPOT TAKEN, SHOULD REJECT IDS ARE:', event.id, id)
            reject({ message: `Timeslot already claimed between ${eStart} and ${eEnd}` })
            return;
          }
        }

        Timeslot.update(timeslotObj, {
          where: { id }
        })
          .then(updated => {
            if (updated[0] === 0) {
              reject({
                message: `Timeslot to update not found`,
                updated: false,
              });
            } else {
              resolve(`Timeslot Updated`);
            }
          })
          .catch(err => {
            console.log(`Error updating Timeslot. Error: ${err}`);
            reject({
              message: `Error updating Timeslot`,
              updated: false,
            });
          });
      })
  });
};

const removeTimeslot = (id) => {
  return new Promise((resolve, reject) => {
    Timeslot.destroy({
      where: { id }
    })
      .then(deleted => {
        if (deleted === 0) {
          reject({
            message: `Timeslot to delete not found`,
            deleted: false,
          });
        } else {
          resolve(`Timeslot Deleted`);
        }
      })
      .catch(err => {
        console.log(`Error deleting Timeslot. Error: ${err}`);
        reject({
          message: `Error deleting Timeslot`,
          deleted: false,
        });
      });
  });
};

export { getTimeslots, findAllTimeslots, addTimeslot, findAllUserTimeslots, updateTimeslot, removeTimeslot };
