import { getRepository } from 'typeorm';

import { cacheClient, getCache } from '../../database/cache';
import Product from '../../database/models/Product';

interface Request {
  restaurantId: string;
  name?: string;
}

class ListProducts {
  public async execute({
    restaurantId,
    name = '',
  }: Request): Promise<Product[]> {
    const productRepository = getRepository(Product);

    const cacheKey = `list-products:${restaurantId}-query:${name}`;

    let products = await getCache<Product[]>(cacheKey);

    if (!products) {
      const query = `%${name}%`;

      products = await productRepository
        .createQueryBuilder('p')
        .select(['p.id', 'p.name'])
        .innerJoin('p.restaurant', 'r')
        .where('p.restaurant_id = :restaurantId', { restaurantId })
        .andWhere('p.name ILIKE :query', { query })
        .orderBy('p.name', 'ASC')
        .getMany();

      cacheClient.set(cacheKey, JSON.stringify(products));
    }

    return products;
  }
}

export default ListProducts;
