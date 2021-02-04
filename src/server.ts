import 'reflect-metadata';
import 'dotenv/config';

import express from 'express';
import cors from 'cors';

import 'express-async-errors';
import './database';
import routes from './routes';
import exceptionHandler from './routes/middlewares/exceptionHandlers';

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);
app.use(exceptionHandler());

app.listen(3333, () => {
  console.log('Server is running on http://localhost:3333');
});
