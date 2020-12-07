import { getRepository } from 'typeorm';
import argon2 from 'argon2';
import { sign } from 'jsonwebtoken';

import authConfig from '../config/auth';
import User from '../database/models/User';
import CustomError from '../errors/CustomError';

interface Request {
  username: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class CreateSession {
  public async execute({ username, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({
      where: { username },
    });

    if (!user) {
      throw new CustomError({
        message: 'Incorrect password',
        statusCode: 401,
      });
    }

    const correctPassword = await argon2.verify(user.password, password);

    if (!correctPassword) {
      throw new CustomError({
        message: 'Incorrect password',
        statusCode: 401,
      });
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return { user, token };
  }
}

export default CreateSession;
