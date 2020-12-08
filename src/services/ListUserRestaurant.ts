import { getRepository } from 'typeorm';

import Restaurant from '../database/models/Restaurant';
import CustomError from '../errors/CustomError';

interface Request {
  userId: string;
  restaurantId: string;
}

class ListUserRestaurant {
  public async execute({
    userId,
    restaurantId,
  }: Request): Promise<Restaurant | undefined> {
    const restaurantRepository = getRepository(Restaurant);

    try {
      const restaurant = await restaurantRepository.findOneOrFail({
        where: {
          user_id: userId,
          id: restaurantId || -1,
        },
      });

      return restaurant;
    } catch {
      throw new CustomError({
        message: 'Restaurant not found',
        statusCode: 404,
      });
    }
  }
}

export default ListUserRestaurant;
