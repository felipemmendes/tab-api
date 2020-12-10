import { getCustomRepository } from 'typeorm';
import ProductRepository from '../../database/repositories/ProductRepository';

interface Request {
  productId: string;
}

class DeleteProduct {
  public async execute({ productId }: Request): Promise<void> {
    const productRepository = getCustomRepository(ProductRepository);

    await productRepository.delete(productId);
  }
}

export default DeleteProduct;
