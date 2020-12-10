import { getCustomRepository } from 'typeorm';
import Product from '../../database/models/Product';
import ProductRepository from '../../database/repositories/ProductRepository';

interface Request {
  restaurantId: string;
  product_name: string;
}

class CreateProduct {
  public async execute({
    restaurantId,
    product_name,
  }: Request): Promise<Product> {
    const productRepository = getCustomRepository(ProductRepository);

    const product = await productRepository.findOneOrCreate({
      restaurantId,
      product_name,
    });

    return product;
  }
}

export default CreateProduct;
