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

const getPW = (login) => {
  return new Promise((resolve, reject) => {
    User.findOne({ where: { login } })
      .then(user => {
        resolve(user);
      })
      .catch(err => {
        console.log(`Error finding Login. Error: ${err}`);
        reject({
          message: `Error finding Login`,
          login: false,
          password: null,
        });
      });
  });
};

const updateUser = (userObj, id) => {
  return new Promise((resolve, reject) => {
    User.update(userObj, {
      where: { id }
    })
      .then(updated => {
        if (updated[0] === 0) {
          reject({
            message: `Error finding User`,
            user: false,
          });
        } else {
          resolve(updated[1]);
        }
      })
      .catch(err => {
        console.log(`Error updating User. Error: ${err}`);
        reject({
          message: `Error updating User`,
          user: false,
        });
      });
  });
};

export { getAllUsers, getPW, updateUser };
