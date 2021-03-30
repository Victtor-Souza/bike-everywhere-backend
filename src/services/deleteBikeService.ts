import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import Bike from '../models/Bike';

interface Request {
  id: string;
  user_id: string;
}

class DeleteBikeService {
  public async execute({ id, user_id }: Request): Promise<void> {
    const bikeRepository = getRepository(Bike);

    const bike = await bikeRepository.findOne({ where: { id } });

    if (!bike) {
      throw new AppError('Bike not found.', 404);
    }

    if (bike.user_id !== user_id)
      throw new AppError('This bike does not belong to this user.', 400);

    await bikeRepository.delete(bike.id);
  }
}
export default DeleteBikeService;
