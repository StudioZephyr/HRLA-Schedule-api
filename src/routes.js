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
  createRoom,
  updateRoomName,
  deleteRoom
} from './controllers/roomController';

import {
  getAllTimeslots,
  createTimeslot
} from './controllers/timeslotController';

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

Router.route('/room/:id')
  .put(updateRoomName)
  .delete(deleteRoom);

Router.route('/timeslot')
  .get(getAllTimeslots)
  .post(createTimeslot);

export { Router };
