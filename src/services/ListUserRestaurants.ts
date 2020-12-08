import { getRepository } from 'typeorm';

import Restaurant from '../database/models/Restaurant';

interface Request {
  userId: string;
}

class ListUserRestaurants {
  public async execute({ userId }: Request): Promise<Restaurant[]> {
    const restaurantRepository = getRepository(Restaurant);

    const restaurants = await restaurantRepository.find({
      where: {
        user_id: userId,
      },
      relations: ['restaurant_visits'],
      loadEagerRelations: true,
    });

    return restaurants;
  }
}

export default ListUserRestaurants;
