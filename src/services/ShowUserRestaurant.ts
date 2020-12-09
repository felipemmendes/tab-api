import { getRepository } from 'typeorm';

import Restaurant from '../database/models/Restaurant';
import CustomError from '../errors/CustomError';

interface Request {
  restaurantId: string;
}

class ListUserRestaurants {
  public async execute({ restaurantId }: Request): Promise<Restaurant> {
    const restaurantRepository = getRepository(Restaurant);

    const restaurant = await restaurantRepository.findOne({
      where: {
        id: restaurantId,
      },
      relations: ['detail'],
    });

    if (!restaurant) {
      throw new CustomError({
        message: 'Restaurant not found.',
        statusCode: 404,
      });
    }

    return restaurant;
  }
}

export default ListUserRestaurants;
