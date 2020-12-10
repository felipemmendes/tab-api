import { getRepository } from 'typeorm';

import Product from '../../database/models/Product';

interface Request {
  productId: string;
}

class ShowProduct {
  public async execute({ productId }: Request): Promise<Product> {
    const productRepository = getRepository(Product);

    const product = await productRepository
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

    return product;
  }
}

export default ShowProduct;
