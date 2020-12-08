import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import Restaurant from '../../database/models/Restaurant';
import CustomError from '../../errors/CustomError';

const checkPermission = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { userId } = req.user;
  const { restaurantId } = req.params;

  const restaurantRepository = getRepository(Restaurant);

  try {
    const restaurant = await restaurantRepository.findOneOrFail({
      where: {
        id: restaurantId,
        user_id: userId,
      },
    });

    req.restaurant = {
      restaurant,
    };

    return next();
  } catch {
    throw new CustomError({
      message: 'Restaurant not found',
      statusCode: 404,
    });
  }
};

export default checkPermission;
