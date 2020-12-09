import { getRepository } from 'typeorm';

import Visit from '../database/models/Visit';

interface Request {
  restaurantId: string;
}

class ListVisits {
  public async execute({ restaurantId }: Request): Promise<Visit[]> {
    const visitRepository = getRepository(Visit);

    const visits = await visitRepository
      .createQueryBuilder('v')
      .select(['v.id', 'v.date', 'v.comments', 'v.score', 'v.total'])
      .where('v.restaurant_id = :restaurantId', { restaurantId })
      .getMany();

    return visits;
  }
}

export default ListVisits;
