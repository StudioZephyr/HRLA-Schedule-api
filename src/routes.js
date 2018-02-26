import express from 'express';

import {
  getAllLogins,
  checkLogin,
  updateLogin,
  deleteLogin,
  getLogin,
  createLogin
} from './controllers/accountController';

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

export { Router };
