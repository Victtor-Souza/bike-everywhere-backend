import { Router } from 'express';
import bikeRouter from './bicycles.routes';
import bikeTypeRouter from './bike-type.routes';
import occurrenceTypeRouter from './occurrence-type.routes';
import occurrencesRouter from './occurrences.routes';
import sessionsRouter from './session.routes';
import usersRouter from './users.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/session', sessionsRouter);
routes.use('/bicycles', bikeRouter);
routes.use('/bike-type', bikeTypeRouter);
routes.use('/occurrences', occurrencesRouter);
routes.use('/occurence-type', occurrenceTypeRouter);

export default routes;
