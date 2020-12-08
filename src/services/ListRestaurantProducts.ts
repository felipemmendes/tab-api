import { getRepository } from 'typeorm';

import RestaurantProduct from '../database/models/RestaurantProduct';

interface Request {
  userId: string;
  restaurantId: string;
}

class ListRestaurantProducts {
  public async execute({
    userId,
    restaurantId,
  }: Request): Promise<RestaurantProduct[]> {
    const productRepository = getRepository(RestaurantProduct);

    const products = await productRepository
      .createQueryBuilder('p')
      .select(['p.id', 'p.name'])
      .innerJoin('p.restaurant', 'r')
      .where('p.restaurant_id = :restaurantId', { restaurantId })
      .andWhere('r.user_id = :userId', { userId })
      .getMany();

    return products;
  }
}

export default ListRestaurantProducts;
