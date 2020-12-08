import { getRepository } from 'typeorm';
import RestaurantProduct from '../database/models/RestaurantProduct';

interface Request {
  restaurantId: string;
  product_name: string;
}

class CreateRestaurantProduct {
  public async execute({
    restaurantId,
    product_name,
  }: Request): Promise<RestaurantProduct> {
    const restaurantProductRepository = getRepository(RestaurantProduct);

    const product = restaurantProductRepository.create({
      name: product_name,
      restaurant_id: restaurantId,
    });

    await restaurantProductRepository.save(product);

    return product;
  }
}

export default CreateRestaurantProduct;
