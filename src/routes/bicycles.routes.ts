import { getRepository } from 'typeorm';
import { Router } from 'express';
import AppError from '../errors/AppError';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import CreateBikeService from '../services/createBikeService';
import DeleteBikeService from '../services/deleteBikeService';
import UpdateBikeService from '../services/updateBikeService';
import Bike from '../models/Bike';

const bikeRouter = Router();
bikeRouter.use(ensureAuthenticated);

bikeRouter.post('/', async (request, response) => {
  const { brand, model, color, serial_number, bike_type_id } = request.body;

  const user_id = request.user.id;

  const createBikeService = new CreateBikeService();
  const bike = await createBikeService.execute({
    brand,
    model,
    color,
    serial_number,
    user_id,
    bike_type_id,
  });

  return response.json(bike);
});

bikeRouter.put('/:id', async (request, response) => {
  const { brand, model, color, serial_number, bike_type_id } = request.body;
  const { id } = request.params;

  const updateBikeService = new UpdateBikeService();
  const bike = await updateBikeService.execute({
    id,
    brand,
    model,
    color,
    serial_number,
    bike_type_id,
  });

  return response.json(bike);
});

bikeRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const user_id = request.user.id;

  const deleteBikeService = new DeleteBikeService();
  await deleteBikeService.execute({ id, user_id });

  return response.status(204);
});

bikeRouter.get('/:userId', async (request, response) => {
  const { userId } = request.params;

  if (userId !== request.user.id)
    throw new AppError('Unauthorized action', 400);

  const bikeRepository = getRepository(Bike);

  const bikes = await bikeRepository.find({
    where: { user_id: userId },
    relations: ['bike_type'],
  });
  return response.json(bikes);
});

export default bikeRouter;
