import { getRepository } from 'typeorm';

import { cacheClient, getCache } from '../../database/cache';
import Restaurant from '../../database/models/Restaurant';

interface Request {
  userId: string;
  page?: number;
}

class ListRestaurants {
  public async execute({ userId, page = 1 }: Request): Promise<Restaurant[]> {
    const restaurantRepository = getRepository(Restaurant);

    const cacheKey = `list-restaurants:${userId}:${page}`;

    let restaurants = await getCache<Restaurant[]>(cacheKey);

    if (!restaurants) {
      restaurants = await restaurantRepository.find({
        where: {
          user_id: userId,
        },
        order: {
          name: 'ASC',
        },
        take: 5,
        skip: 5 * (page - 1),
      });

      cacheClient.set(cacheKey, JSON.stringify(restaurants));
    }
    return restaurants;
  }
}

export default ListRestaurants;
