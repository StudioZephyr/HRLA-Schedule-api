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
          getSingleUser(id)
            .then(user => {
              resolve(user);
            })
            .catch(err => {
              reject(err);
            });
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

const getSingleUser = (id) => {
  return new Promise((resolve, reject) => {
    User.findOne({ where: { id } })
      .then(user => {
        resolve(user.dataValues);
      })
      .catch(err => {
        console.log(`Error finding User. Error: ${err}`);
        reject({
          message: `Error finding User`,
          user: false,
        });
      });
  });
};

const deleteUser = (id) => {
  return new Promise((resolve, reject) => {
    User.destroy({ where: { id } })
      .then(destroyed => {
        if (destroyed !== 1) {
          reject({
            message: `Error finding User to delete`,
            deleted: false,
          });
        } else {
          resolve(`User Deleted`);
        }
      })
      .catch(err => {
        console.log(`Error deleting User. Error: ${err}`);
        reject({
          message: `Error deleting User`,
          deleted: false,
        });
      });
  });
};

const createUser = (userObj) => {
  return new Promise((resolve, reject) => {
    User.create(userObj)
      .then(() => {
        User.findOne({
          where: { login: userObj.login }
        })
          .then(user => {
            resolve(user.dataValues);
          })
          .catch(err => {
            console.log(`Error finding created User. Error: ${err}`);
            reject({
              message: `Error finding created User`,
              found: false,
              user: null,
            });
          });
      })
      .catch(err => {
        console.log(`Error creating User. Error: ${err}`);
        reject({
          message: `Error creating User`,
          found: null,
          user: false,
        });
      });
  });
};

export { getAllUsers, getPW, updateUser, deleteUser, getSingleUser, createUser };
