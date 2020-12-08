import { getRepository } from 'typeorm';
import slugify from 'slugify';

import Restaurant from '../database/models/Restaurant';
import RestaurantDetail from '../database/models/RestaurantDetail';
import CustomError from '../errors/CustomError';

interface Request {
  userId: string;
  restaurantId: string;
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

class UpdateUserRestaurant {
  public async execute({
    userId,
    restaurantId,
    restaurantOptions,
  }: Request): Promise<boolean> {
    const restaurantRepository = getRepository(Restaurant);
    const restaurantDetailRepository = getRepository(RestaurantDetail);

    const { name, restaurantDetail } = restaurantOptions;
    const {
      contact_number,
      description,
      instagram,
      menu,
      website,
    } = restaurantDetail;

    let nameSlug;

    if (name) {
      nameSlug = slugify(name, {
        remove: /[*+~.,;\\/(){}[\]_'´`^¨°"!?:@#]/g,
        lower: true,
      });
    }

    const exists = await restaurantRepository.findOne({
      where: {
        user_id: userId,
        id: restaurantId,
      },
    });

    if (!exists) {
      throw new CustomError({
        message: 'Restaurant not found',
        statusCode: 404,
      });
    }

    await restaurantRepository.update(
      {
        id: restaurantId,
      },
      {
        ...(name && {
          name,
          nameSlug,
        }),
      },
    );

    await restaurantDetailRepository.update(
      {
        id: exists.detail_id,
      },
      {
        ...(contact_number && { contact_number }),
        ...(description && { description }),
        ...(instagram && { instagram }),
        ...(menu && { menu }),
        ...(website && { website }),
      },
    );

    return true;
  }
}

export default UpdateUserRestaurant;
