import express from 'express';

const Router = express.Router();

Router.route('/login')
  .get(getAllLogins);

export { Router };
