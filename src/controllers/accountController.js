import { 
  getAllUsers 
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
      res.status(500).send({ error: err });
    });
};

export { getAllLogins };
