import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../../config/auth';
import CustomError from '../../errors/CustomError';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

const checkAuth = (req: Request, res: Response, next: NextFunction): void => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new CustomError({ message: 'Missing token', statusCode: 401 });
  }

  const [, token] = authorization.split(' ');
  const { secret } = authConfig.jwt;

  try {
    const tokenDecoded = verify(token, secret) as TokenPayload;

    const { sub } = tokenDecoded;

    req.user = {
      userId: sub,
    };

    return next();
  } catch {
    throw new CustomError({ message: 'Invalid token', statusCode: 401 });
  }
};

export default checkAuth;
