import { getRepository } from 'typeorm';
import Restaurant from '../../database/models/Restaurant';

interface Request {
  restaurantId: string;
}

class DeleteRestaurant {
  public async execute({ restaurantId }: Request): Promise<void> {
    const restaurantRepository = getRepository(Restaurant);

    const restaurant = await restaurantRepository.findOneOrFail({
      where: {
        id: restaurantId,
      },
    });

    await restaurantRepository.delete({
      slug: restaurant.slug,
      user_id: restaurant.user_id,
    });
  }
}

export default DeleteRestaurant;
