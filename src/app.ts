import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

export const app = express();

const corsOptions = {
  origin: '*',
};

app.use(morgan('dev'));
app.use(express.json());
app.use(cors(corsOptions));
app.disable('x-powered-by');
