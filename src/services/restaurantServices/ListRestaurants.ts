import { getRepository } from 'typeorm';

import Restaurant from '../../database/models/Restaurant';

interface Request {
  userId: string;
}

class ListRestaurants {
  public async execute({ userId }: Request): Promise<Restaurant[]> {
    const restaurantRepository = getRepository(Restaurant);

    const restaurants = await restaurantRepository.find({
      where: {
        user_id: userId,
      },
    });

    return restaurants;
  }
}

export default ListRestaurants;
