import express from 'express';

import {
  getAllLogins,
  checkLogin,
  updateLogin,
  deleteLogin,
  getLogin,
  createLogin
} from './controllers/accountController';

import {
  getContacts,
  createContact
} from './controllers/contactInfoController';

const Router = express.Router();

Router.route('/login')
  .get(getAllLogins)
  .post(checkLogin);

Router.route('/login/:id')
  .get(getLogin)
  .put(updateLogin)
  .delete(deleteLogin);

Router.route('/signup')
  .post(createLogin);

Router.route('contact/:id')
  .get(getContacts)
  .post(createContact);

export { Router };
