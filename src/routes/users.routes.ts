import { Router } from 'express';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import CreateUserService from '../services/createUserService';
import UpdateUserService from '../services/updateUserService';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  const {
    name,
    family_name,
    telephone,
    cell_phone,
    email,
    password,
  } = request.body;

  const createUserService = new CreateUserService();
  const user = await createUserService.execute({
    name,
    family_name,
    telephone,
    cell_phone,
    email,
    password,
  });

  delete user.password;

  return response.json(user);
});

usersRouter.put('/:id', ensureAuthenticated, async (request, response) => {
  const { id } = request.params;
  const { name, family_name, telephone, cell_phone, email } = request.body;

  const updateUserService = new UpdateUserService();
  const user = await updateUserService.execute({
    id,
    name,
    family_name,
    telephone,
    cell_phone,
    email,
  });

  delete user.password;

  return response.json(user);
});

export default usersRouter;
