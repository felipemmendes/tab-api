import { getRepository } from 'typeorm';
import { invalidateCachePrefix } from '../../database/cache';
import Restaurant from '../../database/models/Restaurant';

interface Request {
  userId: string;
  restaurantId: string;
}

class DeleteRestaurant {
  public async execute({ userId, restaurantId }: Request): Promise<void> {
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

    await invalidateCachePrefix(`list-restaurants:${userId}:*`);
  }
}

export default DeleteRestaurant;
