import { getRepository } from 'typeorm';

import RestaurantVisit from '../database/models/RestaurantVisit';

interface Request {
  restaurantId: string;
}

class ListRestaurantVisits {
  public async execute({ restaurantId }: Request): Promise<RestaurantVisit[]> {
    const visitRepository = getRepository(RestaurantVisit);

    const visits = await visitRepository
      .createQueryBuilder('v')
      .select([
        'v.id',
        'v.date',
        'v.comments',
        'v.score',
        'v.order_total',
        'o.product_value',
        'o.product_quantity',
        'p.name',
      ])
      .innerJoin('v.order', 'o')
      .innerJoin('o.product', 'p')
      .where('v.restaurant_id = :restaurantId', { restaurantId })
      .getMany();

    return visits;
  }
}

export default ListRestaurantVisits;
