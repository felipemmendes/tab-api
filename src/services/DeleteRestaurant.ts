import { getRepository } from 'typeorm';
import Restaurant from '../database/models/Restaurant';
import CustomError from '../errors/CustomError';

interface Request {
  restaurantId: string;
}

class DeleteRestaurant {
  public async execute({ restaurantId }: Request): Promise<void> {
    const restaurantRepository = getRepository(Restaurant);

    const restaurant = await restaurantRepository.findOne({
      where: {
        id: restaurantId,
      },
    });

    if (!restaurant) {
      throw new CustomError({
        message: 'Restaurant not found',
        statusCode: 404,
      });
    }

    await restaurantRepository.delete({
      slug: restaurant.slug,
      user_id: restaurant.user_id,
    });
  }
}

export default DeleteRestaurant;
