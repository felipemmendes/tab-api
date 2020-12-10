import { getRepository } from 'typeorm';

import Restaurant from '../../database/models/Restaurant';

interface Request {
  restaurantId: string;
}

class ShowRestaurant {
  public async execute({ restaurantId }: Request): Promise<Restaurant> {
    const restaurantRepository = getRepository(Restaurant);

    const restaurant = await restaurantRepository.findOneOrFail({
      where: {
        id: restaurantId,
      },
      relations: ['detail'],
    });

    return restaurant;
  }
}

export default ShowRestaurant;
