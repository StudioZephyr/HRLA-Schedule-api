import { db } from '../index';
import { User } from '../model/user';
import { Room } from '../model/room';
import { Timeslot } from '../model/timeslot';
import { Contact } from '../model/contact';

import { log } from '../../util/logger';

const syncDB = (
  bool=false
) => {
  db.authenticate()
    .then(() => {
      log(`DB authenticated`);
      User.sync({ force: bool })
        .then(() => {
          log(`User table synced`);
          Contact.sync({ force: bool })
            .then(() => {
              log(`Contact table synced`)
            })
            .catch(err => {
              log(`Error syncing Contact table. Error: ${err.message}`);
            });
          Room.sync({ force: bool })
            .then(() => {
              log(`Room table synced`);
              Timeslot.sync({ force: bool })
                .then(() => {
                  log(`Timeslot table synced`);
                })
                .catch(err => {
                  log(`Error syncing Timeslot table. Error: ${err.message}`);
                });
            })
            .catch(err => {
              log(`Error syncing Room table. Error: ${err.message}`);
            });
        })
        .catch(err => {
          log(`Error syncing User table. Error: ${err.message}`);
        });
    })
    .catch(err => {
      log(`Error authenticating db. Error: ${err.message}`)
    });
};

export { syncDB };
