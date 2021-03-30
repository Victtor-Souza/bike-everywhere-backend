import { Router } from 'express';
import bikeRouter from './bicycles.routes';
import sessionsRouter from './session.routes';
import usersRouter from './users.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/session', sessionsRouter);
routes.use('/bicycles', bikeRouter);

export default routes;
