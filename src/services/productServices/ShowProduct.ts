import { getRepository } from 'typeorm';

import { cacheClient, getCache } from '../../database/cache';
import Product from '../../database/models/Product';

interface Request {
  productId: string;
}

class ShowProduct {
  public async execute({ productId }: Request): Promise<Product> {
    const productRepository = getRepository(Product);

    const cacheKey = `products:${productId}`;

    let product = await getCache<Product>(cacheKey);

    if (!product) {
      product = await productRepository
        .createQueryBuilder('p')
        .select([
          'p.id',
          'p.name',
          'o.id',
          'o.product_value',
          'o.product_quantity',
          'o.visit_id',
        ])
        .leftJoin('p.orders', 'o')
        .where('p.id = :productId', { productId })
        .getOneOrFail();

      cacheClient.set(cacheKey, JSON.stringify(product));
    }
    return product;
  }
}

export default ShowProduct;
