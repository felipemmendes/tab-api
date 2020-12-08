import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { verify } from 'jsonwebtoken';

import User from '../../database/models/User';
import authConfig from '../../config/auth';
import CustomError from '../../errors/CustomError';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

const checkAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new CustomError({ message: 'Missing token', statusCode: 401 });
  }

  const [, token] = authorization.split(' ');
  const { secret } = authConfig.jwt;

  try {
    const userRepository = getRepository(User);
    const tokenDecoded = verify(token, secret) as TokenPayload;

    const { sub } = tokenDecoded;

    await userRepository.findOneOrFail({
      where: {
        id: sub || -1,
      },
    });

    req.user = {
      userId: sub,
    };

    return next();
  } catch {
    throw new CustomError({ message: 'Invalid token', statusCode: 401 });
  }
};

export default checkAuth;
