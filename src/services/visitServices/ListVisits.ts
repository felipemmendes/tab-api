import { getRepository } from 'typeorm';

import { cacheClient, getCache } from '../../database/cache';
import Visit from '../../database/models/Visit';

interface Request {
  restaurantId: string;
  page?: number;
}

class ListVisits {
  public async execute({ restaurantId, page = 1 }: Request): Promise<Visit[]> {
    const visitRepository = getRepository(Visit);

    const cacheKey = `list-visits:${restaurantId}:${page}`;

    let visits = await getCache<Visit[]>(cacheKey);

    if (!visits) {
      visits = await visitRepository
        .createQueryBuilder('v')
        .select(['v.id', 'v.date', 'v.comments', 'v.score', 'v.total'])
        .where('v.restaurant_id = :restaurantId', { restaurantId })
        .orderBy('v.date', 'DESC')
        .skip(5 * (page - 1))
        .take(5)
        .getMany();

      cacheClient.set(cacheKey, JSON.stringify(visits));
    }

    return visits;
  }
}

export default ListVisits;
