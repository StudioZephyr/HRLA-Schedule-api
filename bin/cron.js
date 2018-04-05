require('babel-register');
require('babel-polyfill');

const http = require('http');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const moment = require('moment');
const CronJob = require('cron').CronJob;
const { Timeslot } = require('../src/database/model/timeslot');
const { User } = require('../src/database/model/user');

const io = require('../socket-server/socket.js').io;

const checkEvents = new CronJob('00 0,15,30,45 * * * *', function () {
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
            if (i === users.length - 1) {
              console.log('emitting to socket')
              // io.sockets.emit('updateRequest', 'update now')
              http.get(process.env.API_SOCKET);
            }
          }
        })
    });
},
  false,
  'America/Los_Angeles'
);

const deleteEvents = new CronJob('00 59 23 * * *', function () {
  Timeslot.destroy({
    where: { finished: true }
  })
},
false,
'America/Los_Angeles')

checkEvents.start();
deleteEvents.start()

console.log('Cron checkEvents status:', checkEvents.running);
console.log('Cron deleteEvents status:', deleteEvents.running);