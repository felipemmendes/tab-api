import { getRepository } from 'typeorm';

import { cacheClient, getCache } from '../../database/cache';
import Restaurant from '../../database/models/Restaurant';

interface Request {
  restaurantId: string;
}

class ShowRestaurant {
  public async execute({ restaurantId }: Request): Promise<Restaurant> {
    const restaurantRepository = getRepository(Restaurant);

    const cacheKey = `restaurants:${restaurantId}`;

    let restaurant = await getCache<Restaurant>(cacheKey);

    if (!restaurant) {
      restaurant = await restaurantRepository.findOneOrFail({
        where: {
          id: restaurantId,
        },
        relations: ['detail'],
      });

      cacheClient.set(cacheKey, JSON.stringify(restaurant));
    }

    return restaurant;
  }
}

export default ShowRestaurant;
