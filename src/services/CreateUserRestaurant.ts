import { getRepository } from 'typeorm';
import slugify from 'slugify';

import Restaurant from '../database/models/Restaurant';

interface Request {
  userId: string;
  restaurantOptions: {
    name: string;
  };
}

class CreateRestaurant {
  public async execute({
    userId,
    restaurantOptions,
  }: Request): Promise<Restaurant> {
    const restaurantRepository = getRepository(Restaurant);
    const { name } = restaurantOptions;
    const nameSlug = slugify(name, {
      remove: /[*+~.,;\\/(){}[\]_'´`^¨°"!?:@#]/g,
      lower: true,
    });

    const restaurant = restaurantRepository.create({
      name,
      name_slug: nameSlug,
      user_id: userId,
    });

    await restaurantRepository.save(restaurant);

    return restaurant;
  }
}

export default CreateRestaurant;
