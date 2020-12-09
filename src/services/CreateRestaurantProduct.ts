import { getCustomRepository } from 'typeorm';
import RestaurantProduct from '../database/models/RestaurantProduct';
import RestaurantProductRepository from '../database/repositories/RestaurantProductRepository';

interface Request {
  restaurantId: string;
  product_name: string;
}

class CreateRestaurantProduct {
  public async execute({
    restaurantId,
    product_name,
  }: Request): Promise<RestaurantProduct> {
    const restaurantProductRepository = getCustomRepository(
      RestaurantProductRepository,
    );

    const product = await restaurantProductRepository.findOneOrCreate({
      restaurantId,
      product_name,
    });

    return product;
  }
}

export default CreateRestaurantProduct;
