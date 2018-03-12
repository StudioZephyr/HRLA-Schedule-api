require('babel-register');
require('babel-polyfill');

const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const CronJob = require('cron').CronJob;
const { Timeslot } = require('../src/database/model/timeslot');
const { User } = require('../src/database/model/user');

const task = new CronJob('00 0,15,30,45 * * * *', function () {
  let currentTime = new Date();
  Timeslot.findAll({
    where: { finished: false }
  })
    .then(async (events) => {
      for (let i = 0; i < events.length; i++) {
        if (events[i].end < currentTime) {
          events[i].finished = true;
          await Timeslot.update({ finished: true }, {
            where: { id: events[i].id }
          });
        }
      }
      await User.findAll()
        .then(async (users) => {
          for (let i = 0; i < users.length; i++) {
            user = users[i];
            userHasEvent = false;
            for (let j = 0; j < events.length; j++) {
              event = events[j];
              if (event.UserId === user.id && !event.finished) {
                userHasEvent = true;
              }
            }
            if (!userHasEvent) {
              await User.update({hasEvent: false}, {
                where: { id: user.id }
              });
            }
          }
        })
    });
},
  false,
  'America/Los_Angeles'
);

task.start();

console.log('Cron task status:', task.running);