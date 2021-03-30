import { v4 as uuidv4 } from 'uuid';
import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import Bike from '../models/Bike';

interface Request {
  brand: string;
  model: string;
  color: string;
  serial_number: string;
  bike_type_id: string;
  user_id: string;
}

class CreateBikeService {
  public async execute({
    brand,
    model,
    color,
    serial_number,
    bike_type_id,
    user_id,
  }: Request): Promise<Bike> {
    const bikeRepository = getRepository(Bike);

    const checkVehicleExists = await bikeRepository.findOne({
      where: { serial_number },
    });

    if (checkVehicleExists) {
      throw new AppError('Serial number already used.');
    }

    const bike = bikeRepository.create({
      id: uuidv4(),
      brand,
      model,
      color,
      serial_number,
      bike_type_id,
      user_id,
    });

    await bikeRepository.save(bike);

    return bike;
  }
}
export default CreateBikeService;
