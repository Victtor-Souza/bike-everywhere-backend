import { getRepository } from 'typeorm';
import User from '../models/User';
import AppError from '../errors/AppError';

interface Request {
  id: string;
  name: string;
  family_name: string;
  telephone: string;
  cell_phone: string;
  email: string;
}

class UpdateUserService {
  public async execute({
    id,
    name,
    family_name,
    telephone,
    cell_phone,
    email,
  }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ id });
    if (!user) throw new AppError('User not found', 404);

    user.name = name;
    user.family_name = family_name;
    user.telephone = telephone;
    user.cell_phone = cell_phone;
    user.email = email;

    await usersRepository.save(user);
    return user;
  }
}
export default UpdateUserService;
