import { getRepository } from 'typeorm';

import Restaurant from '../database/models/Restaurant';

interface Request {
  userId: string;
  restaurantSlug: string;
}

class ListUserRestaurant {
  public async execute({
    userId,
    restaurantSlug,
  }: Request): Promise<Restaurant | undefined> {
    const restaurantRepository = getRepository(Restaurant);

    const restaurant = await restaurantRepository.findOne({
      where: {
        user_id: userId,
        name_slug: restaurantSlug,
      },
    });

    return restaurant;
  }
}

export default ListUserRestaurant;
