import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { CustomError } from './interfaces/errors.js';
import createDebug from 'debug';
import { usersRouter } from './routers/users.router.js';

const debug = createDebug('FRNMS: app');

export const app = express();

const corsOptions = {
  origin: '*',
};

app.use(morgan('dev'));
app.use(express.json());
app.use(cors(corsOptions));
app.disable('x-powered-by');

app.use('/users', usersRouter);

app.use(
  (error: CustomError, _req: Request, resp: Response, _next: NextFunction) => {
    debug('Soy un middleware de errores');
    const status = error.statusCode || 500;
    const statusMsg = error.statusMsg || 'Internal server error';
    resp.status(status);
    resp.json({
      error: [
        {
          status,
          statusMsg,
        },
      ],
    });
    debug(status, statusMsg, error.message);
  }
);
