require('babel-register');
require('babel-polyfill');

const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const CronJob = require('cron').CronJob;
const { Timeslot } = require('../src/database/model/timeslot');

const task = new CronJob('00 0,15,30,45 * * * *', function () {
  let currentTime = new Date();
  Timeslot.findAll({
    where: { finished: false }
  })
    .then(async (events) => {
      for (let i = 0; i < events.length; i++) {
        if (events[i].end < currentTime) {
          await Timeslot.update({ finished: true }, {
            where: { id: events[i].id }
          });
        }
      }
    });
},
  false,
  'America/Los_Angeles'
);

task.start();

console.log('Cron task status:', task.running);