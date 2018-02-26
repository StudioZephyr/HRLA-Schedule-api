import {
  getAllContacts
} from '../database/controllers/contactController';

const getContacts = (req, res) => {
  getAllContacts(req.params.id)
    .then(contacts => {
      res.status(200).send({ result: contacts });
    })
    .catch(err => {
      res.status(500).send({ result: err });
    });
};

export { getContacts };
