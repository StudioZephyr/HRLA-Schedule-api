import { 
  getAllUsers,
  getPW,
  updateUser,
  deleteUser,
  getSingleUser
} from '../database/controllers/userController';

import {
  getAllContacts
} from '../database/controllers/contactController';

const getAllLogins = (req, res) => {
  getAllUsers()
    .then(async (users) => {
      const userArr = [];
      for (let i = 0; i < users.length; i++) {
        await getAllContacts(users[i].id)
          .then(contact => {
            users[i].contacts = data;
            userObj.push(users[i]);
          })
          .catch(err => {
            console.log(`Error: ${err.message}`);
          });
      }
      res.status(200).send({ result: userObj });
    })
    .catch(err => {
      res.status(500).send({ result: err });
    });
};

const checkLogin = (req, res) => {
  getPW(req.body.login)
    .then(user => {
      if (user.password !== req.body.password) {
        const result = {
          message: 'Incorrect PW',
          login: true,
          password: false,
        };
        res.status(500).send({ result });
      } else {
        res.status(200).send({ result: user });
      }
    })
    .catch(err => {
      res.status(500).send({ result: err });
    });
};

const updateLogin = (req, res) => {
  updateUser(req.body, req.params.id)
    .then(user => {
      res.status(200).send({ result: user });
    })
    .catch(err => {
      res.status(500).send({ result: err });
    });
};

const deleteLogin = (req, res) => {
  deleteUser(req.params.id)
    .then(success => {
      res.status(200).send({ result: success });
    })
    .catch(err => {
      res.status(500).send({ result: err });
    });
};

const getLogin = (req, res) => {
  getSingleUser(req.params.id)
    .then(user => {
      res.status(200).send({ result: success });
    })
    .catch(err => {
      res.status(500).send({ result: err });
    });
};

export { getAllLogins, checkLogin, updateLogin, deleteLogin };
