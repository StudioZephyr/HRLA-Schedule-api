import express from 'express';

import {
  getAllLogins,
  checkLogin,
  updateLogin,
  deleteLogin
} from './controllers/accountController';

const Router = express.Router();

Router.route('/login')
  .get(getAllLogins)
  .post(checkLogin);

Router.route('/login/:id')
  .put(updateLogin)
  .delete(deleteLogin);

export { Router };
