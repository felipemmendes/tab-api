import { getRepository } from 'typeorm';

import Product from '../database/models/Product';

interface Request {
  restaurantId: string;
}

class ListProducts {
  public async execute({ restaurantId }: Request): Promise<Product[]> {
    const productRepository = getRepository(Product);

    const products = await productRepository
      .createQueryBuilder('p')
      .select(['p.id', 'p.name'])
      .innerJoin('p.restaurant', 'r')
      .where('p.restaurant_id = :restaurantId', { restaurantId })
      .getMany();

    return products;
  }
}

export default ListProducts;
