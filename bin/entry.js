require('babel-register');
require('babel-polyfill');

const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const environment = process.argv[2];

if (environment === 'production') {
  process.env.NODE_ENV = 'production';
}

require('../src/index');
require('../socket-server/index');
