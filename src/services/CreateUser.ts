import { getRepository } from 'typeorm';
import argon2 from 'argon2';

import User from '../database/models/User';
import CustomError from '../errors/CustomError';

interface Request {
  username: string;
  password: string;
}

class CreateUser {
  public async execute({ username, password }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const userExists = await usersRepository.findOne({
      where: { username },
    });

    if (userExists) {
      throw new CustomError({
        message: 'Username not available',
        statusCode: 422,
      });
    }

    const hashedPassword = await argon2.hash(password);

    const user = usersRepository.create({
      username,
      password: hashedPassword,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUser;
