import { v4 as uuidv4 } from 'uuid';
import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../models/User';
import AppError from '../errors/AppError';

interface Request {
  name: string;
  family_name: string;
  telephone: string;
  cell_phone: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({
    name,
    family_name,
    telephone,
    cell_phone,
    email,
    password,
  }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const checkUserExists = await usersRepository.findOne({ where: { email } });

    if (checkUserExists) {
      throw new AppError('Email address already used.');
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      id: uuidv4(),
      name,
      family_name,
      telephone,
      cell_phone,
      email,
      password: hashedPassword,
    });

    await usersRepository.save(user);

    return user;
  }
}
export default CreateUserService;
