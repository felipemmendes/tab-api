import { getRepository } from 'typeorm';

import Restaurant from '../../database/models/Restaurant';

interface Request {
  userId: string;
  page?: number;
}

class ListRestaurants {
  public async execute({ userId, page = 1 }: Request): Promise<Restaurant[]> {
    const restaurantRepository = getRepository(Restaurant);

    const restaurants = await restaurantRepository.find({
      where: {
        user_id: userId,
      },
      order: {
        name: 'ASC',
      },
      take: 5,
      skip: 5 * (page - 1),
    });

    return restaurants;
  }
}

export default ListRestaurants;
