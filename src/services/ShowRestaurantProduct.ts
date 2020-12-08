import { getRepository } from 'typeorm';

import RestaurantProduct from '../database/models/RestaurantProduct';
import CustomError from '../errors/CustomError';

interface Request {
  restaurantId: string;
  productId: string;
}

class ShowRestaurantProduct {
  public async execute({
    restaurantId,
    productId,
  }: Request): Promise<RestaurantProduct> {
    const productRepository = getRepository(RestaurantProduct);

    try {
      const product = await productRepository
        .createQueryBuilder('p')
        .select([
          'p.id',
          'p.name',
          'o.id',
          'o.product_value',
          'o.product_quantity',
          'o.restaurant_visit_id',
        ])
        .innerJoin('p.restaurant', 'r')
        .innerJoin('p.orders', 'o')
        .where('p.id = :productId', { productId })
        .andWhere('p.restaurant_id = :restaurantId', { restaurantId })
        .getOneOrFail();

      return product;
    } catch (err) {
      if (err instanceof Error && err.name === 'EntityNotFound') {
        throw new CustomError({
          message: 'Product not found',
          statusCode: 404,
        });
      } else {
        throw new Error(err);
      }
    }
  }
}

export default ShowRestaurantProduct;
