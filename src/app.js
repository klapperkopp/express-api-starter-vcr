import express, { json } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from "dotenv"
dotenv.config();

import { notFound, errorHandler } from './middlewares.js';
import api from './api/index.js';

const app = express();

// mount middelware
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(json());

// mount base path
app.get('/', (req, res) => {
  res.json({
    message: 'Server is up.',
  });
});


// mount VCR health check endpoints
app.use(["/_/metrics", "/_/health"], (req, res) => {
  res.sendStatus(200)
});

// mount API endpoints
app.use('/api/v1', api);

// mount error middlewares
app.use(notFound);
app.use(errorHandler);

export default app;
