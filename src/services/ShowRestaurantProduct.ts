import { getRepository } from 'typeorm';

import RestaurantProduct from '../database/models/RestaurantProduct';
import CustomError from '../errors/CustomError';

interface Request {
  userId: string;
  restaurantId: string;
  productId: string;
}

class ShowRestaurantProduct {
  public async execute({
    userId,
    restaurantId,
    productId,
  }: Request): Promise<RestaurantProduct> {
    const productRepository = getRepository(RestaurantProduct);

    try {
      const product = await productRepository
        .createQueryBuilder('p')
        .select(['p.id', 'p.name', 'o.value', 'o.restaurant_visit_id'])
        .innerJoin('p.restaurant', 'r')
        .innerJoin('p.orders', 'o')
        .where('p.id = :productId', { productId })
        .andWhere('p.restaurant_id = :restaurantId', { restaurantId })
        .andWhere('r.user_id = :userId', { userId })
        .getOneOrFail();

      return product;
    } catch {
      throw new CustomError({
        message: 'Product not found',
        statusCode: 404,
      });
    }
  }
}

export default ShowRestaurantProduct;
