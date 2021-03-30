import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import Bike from '../models/Bike';

interface Request {
  id: string;
  brand: string;
  model: string;
  color: string;
  serial_number: string;
  bike_type_id: string;
}

class UpdateBikeService {
  public async execute({
    id,
    brand,
    model,
    color,
    serial_number,
    bike_type_id,
  }: Request): Promise<Bike> {
    const bikeRepository = getRepository(Bike);

    const bike = await bikeRepository.findOne({ where: { id } });

    if (!bike) throw new AppError('Bike not found.', 404);

    bike.brand = brand;
    bike.model = model;
    bike.color = color;
    bike.serial_number = serial_number;
    bike.bike_type_id = bike_type_id;

    await bikeRepository.save(bike);

    return bike;
  }
}
export default UpdateBikeService;
