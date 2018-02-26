import express from 'express';

import {
  getAllLogins,
  checkLogin
} from './controllers/accountController';

const Router = express.Router();

Router.route('/login')
  .get(getAllLogins)
  .post(checkLogin);

export { Router };
