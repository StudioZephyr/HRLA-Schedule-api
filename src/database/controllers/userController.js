import Promise from 'bluebird';

import { User } from '../model/user';

const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    User.findAll()
      .then(users => {
        const userArr = [];
        for (let i = 0; i < users.length; i++) {
          userArr.push(users[i].dataValues);
        }
        resolve(userArr);
      })
      .catch(err => {
        console.log(`Error grabbing all Users. Error: ${err}`);
        reject({
          message: `Error grabbing all Users`,
          error: true,
        });
      });
  });
};

export { getAllUsers };
