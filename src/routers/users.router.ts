import { Router } from 'express';
import { UsersController } from '../controllers/users.controller.js';
import { UsersMongoRepo } from '../repo/users/users.mongo.repo.js';

export const usersRouter = Router();

const repo = UsersMongoRepo.getInstance();
const controller = new UsersController(repo);

usersRouter.get('/', controller.getAll.bind(controller));
usersRouter.post('/register', controller.register.bind(controller));
