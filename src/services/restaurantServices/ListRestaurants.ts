import { getRepository } from 'typeorm';

import { cacheClient, getCache } from '../../database/cache';
import Restaurant from '../../database/models/Restaurant';

interface Request {
  userId: string;
  page?: number;
  name?: string;
}

class ListRestaurants {
  public async execute({
    userId,
    page = 1,
    name = '',
  }: Request): Promise<Restaurant[]> {
    const restaurantRepository = getRepository(Restaurant);

    const cacheKey = `list-restaurants:${userId}-query:${name}-page:${page}`;

    let restaurants = await getCache<Restaurant[]>(cacheKey);

    if (!restaurants) {
      const query = `%${name}%`;
      restaurants = await restaurantRepository
        .createQueryBuilder('r')
        .select()
        .where('r.user_id = :userId', { userId })
        .andWhere('r.name ILIKE :query', { query })
        .orderBy('r.name', 'ASC')
        .skip(5 * (page - 1))
        .take(5)
        .getMany();

      cacheClient.set(cacheKey, JSON.stringify(restaurants));
    }
    return restaurants;
  }
}

export default ListRestaurants;
