import express from 'express';
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

// Use for dev environment
app.use(express.static(path.resolve(__dirname, process.env.STATIC_PATH)));

app.use('/api', Router);

app.get('/*', (req, res) => {
  // Should be changed out for production
  res.sendFile(path.resolve(__dirname, process.env.STATIC_INDEX_PATH));
});

syncDB();

export { app };
