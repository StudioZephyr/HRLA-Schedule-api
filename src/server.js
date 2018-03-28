import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';

import { Router } from './routes';
import { syncDB } from './database/util/sync';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('short'));

app.get('*.js', function (req, res, next) {

  req.url = req.url + '.gz';
  res.set('Content-Encoding', 'gzip');
  next();
});

// Use for dev environment
app.use(express.static(path.resolve(__dirname, process.env.STATIC_PATH)));

app.use('/api', Router);

app.get('/*', (req, res) => {
  // Should be changed out for production
  res.sendFile(path.resolve(__dirname, process.env.STATIC_INDEX_PATH));
});

syncDB();

export { app };
