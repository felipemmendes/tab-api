import { getRepository } from 'typeorm';
import slugify from 'slugify';

import Restaurant from '../database/models/Restaurant';
import CustomError from '../errors/CustomError';

interface Request {
  userId: string;
  restaurantOptions: {
    name: string;
    restaurantDetail: {
      description: string;
      website: string;
      instagram: string;
      contact_number: string;
      menu: string;
    };
  };
}

class CreateRestaurant {
  public async execute({
    userId,
    restaurantOptions,
  }: Request): Promise<Restaurant> {
    const restaurantRepository = getRepository(Restaurant);

    const { name, restaurantDetail } = restaurantOptions;
    const slug = slugify(name, {
      remove: /[*+~.,;\\/(){}[\]_'´`^¨°"!?:@#]/g,
      lower: true,
    });

    const exists = await restaurantRepository.findOne({
      where: {
        user_id: userId,
        slug,
      },
    });

    if (exists) {
      throw new CustomError({
        message: 'Restaurant already exists',
        statusCode: 422,
      });
    }

    const restaurant = restaurantRepository.create({
      name,
      slug,
      user_id: userId,
      detail: restaurantDetail,
    });

    await restaurantRepository.save(restaurant);

    return restaurant;
  }
}

export default CreateRestaurant;
