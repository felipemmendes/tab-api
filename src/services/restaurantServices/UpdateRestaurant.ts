import { getManager } from 'typeorm';
import slugify from 'slugify';

import Restaurant from '../../database/models/Restaurant';
import RestaurantDetail from '../../database/models/RestaurantDetail';

interface Request {
  restaurantId: string;
  restaurantOptions: {
    name: string;
    description: string;
    website: string;
    instagram: string;
    contact_number: string;
    menu: string;
  };
}

class UpdateRestaurant {
  public async execute({
    restaurantId,
    restaurantOptions,
  }: Request): Promise<void> {
    const {
      name,
      contact_number,
      description,
      instagram,
      menu,
      website,
    } = restaurantOptions;

    await getManager().transaction(async entityManager => {
      if (name) {
        const slug = slugify(name, {
          remove: /[*+~.,;\\/(){}[\]_'´`^¨°"!?:@#]/g,
          lower: true,
        });

        await entityManager.update(
          Restaurant,
          {
            id: restaurantId,
          },
          {
            ...(name && {
              name,
              slug,
            }),
          },
        );
      }

      if (contact_number || description || instagram || menu || website) {
        const restaurant = await entityManager.findOneOrFail(
          Restaurant,
          restaurantId,
        );

        await entityManager.update(
          RestaurantDetail,
          {
            id: restaurant.detail_id,
          },
          {
            ...(contact_number && { contact_number }),
            ...(description && { description }),
            ...(instagram && { instagram }),
            ...(menu && { menu }),
            ...(website && { website }),
          },
        );
      }
    });
  }
}

export default UpdateRestaurant;
