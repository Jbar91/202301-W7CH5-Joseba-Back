import createDebug from 'debug';
import { NextFunction, Request, Response } from 'express';
import { User } from '../entities/user.js';
import { HTTPError } from '../interfaces/errors.js';
import { Repo } from '../repo/repo.interface.js';

const debug = createDebug('FRNMS: users controller');

export class UsersController {
  constructor(public repo: Repo<User>) {
    debug('Controller instantiated');
  }

  async register(req: Request, resp: Response, next: NextFunction) {
    debug('register');
    try {
      if (!req.body.email || !req.body.passwd)
        throw new HTTPError(403, 'Unauthorized', 'Invalid email or password');

      const data = await this.repo.create(req.body);
      resp.status(201);
      resp.json({
        results: [data],
      });
    } catch (error) {
      next(error);
    }
  }

  async getAll(req: Request, resp: Response, next: NextFunction) {
    debug('getAll method');
    try {
      const data = await this.repo.query();
      resp.json({
        results: [data],
      });
    } catch (error) {
      next(error);
    }
  }

  async get(req: Request, resp: Response, next: NextFunction) {
    const id = req.params.id;
    debug('get method');
    try {
      const data = await this.repo.queryId(id);
      resp.json({
        results: [data],
      });
    } catch (error) {
      next(error);
    }
  }
}
