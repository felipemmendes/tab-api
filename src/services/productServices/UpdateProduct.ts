import { getCustomRepository } from 'typeorm';

import ProductRepository from '../../database/repositories/ProductRepository';
import CustomError from '../../errors/CustomError';

interface Request {
  restaurantId: string;
  productId: string;
  newName: string;
}

class UpdateProduct {
  public async execute({
    restaurantId,
    productId,
    newName,
  }: Request): Promise<void> {
    const productRepository = getCustomRepository(ProductRepository);

    const exists = await productRepository.findOne({
      where: {
        name: newName,
        restaurant_id: restaurantId,
      },
    });

    if (exists) {
      throw new CustomError({
        message: 'Product name is not available',
        statusCode: 422,
      });
    }

    await productRepository.update(productId, {
      name: newName,
    });
  }
}

export default UpdateProduct;
