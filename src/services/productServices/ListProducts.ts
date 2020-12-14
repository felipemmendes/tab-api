import { getRepository } from 'typeorm';

import { cacheClient, getCache } from '../../database/cache';
import Product from '../../database/models/Product';

interface Request {
  restaurantId: string;
}

class ListProducts {
  public async execute({ restaurantId }: Request): Promise<Product[]> {
    const productRepository = getRepository(Product);

    const cacheKey = `list-products:${restaurantId}`;

    let products = await getCache<Product[]>(cacheKey);

    if (!products) {
      products = await productRepository
        .createQueryBuilder('p')
        .select(['p.id', 'p.name'])
        .innerJoin('p.restaurant', 'r')
        .where('p.restaurant_id = :restaurantId', { restaurantId })
        .orderBy('p.name', 'ASC')
        .getMany();

      cacheClient.set(cacheKey, JSON.stringify(products));
    }

    return products;
  }
}

export default ListProducts;
