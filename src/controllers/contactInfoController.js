import {
  getAllContacts,
  addContact
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

const createContact = (req, res) => {
  addContact(req.body, req.params.id)
    .then(success => {
      res.status(201).send({ result: success });
    })
    .catch(err => {
      res.status(500).send({ result: err });
    });
};

export { getContacts, createContact };
