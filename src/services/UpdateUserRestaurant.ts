import { getManager } from 'typeorm';
import slugify from 'slugify';

import Restaurant from '../database/models/Restaurant';
import RestaurantDetail from '../database/models/RestaurantDetail';

interface Request {
  restaurantId: string;
  restaurantDetailId: string;
  restaurantOptions: {
    name: string;
    description: string;
    website: string;
    instagram: string;
    contact_number: string;
    menu: string;
  };
}

class UpdateUserRestaurant {
  public async execute({
    restaurantId,
    restaurantDetailId,
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

    let nameSlug = '';

    if (name) {
      nameSlug = slugify(name, {
        remove: /[*+~.,;\\/(){}[\]_'´`^¨°"!?:@#]/g,
        lower: true,
      });
    }

    await getManager().transaction(async entityManager => {
      await entityManager.update(
        Restaurant,
        {
          id: restaurantId,
        },
        {
          ...(name && {
            name,
            name_slug: nameSlug,
          }),
        },
      );

      await entityManager.update(
        RestaurantDetail,
        {
          id: restaurantDetailId,
        },
        {
          ...(contact_number && { contact_number }),
          ...(description && { description }),
          ...(instagram && { instagram }),
          ...(menu && { menu }),
          ...(website && { website }),
        },
      );
    });
  }
}

export default UpdateUserRestaurant;
