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
  createContact,
  updateContactInfo,
  deleteContactInfo
} from './controllers/contactInfoController';

import {
  getAllRooms,
  getAllRoomTimeslots,
  createRoom
} from './controllers/roomController';

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
  .post(createContact)
  .put(updateContactInfo)
  .delete(deleteContactInfo);

Router.route('/rooms')
  .get(getAllRooms);

Router.route('/room')
  .get(getAllRoomTimeslots)
  .post(createRoom);

export { Router };
