import { getManager } from 'typeorm';

import RestaurantVisit from '../database/models/RestaurantVisit';
import RestaurantProductRepository from '../database/repositories/RestaurantProductRepository';
import OrderProductRepository from '../database/repositories/OrderProductRepository';

interface Request {
  userId: string;
  restaurantId: string;
  visitOptions: {
    order: {
      product_name: string;
      product_value: number;
      product_quantity: number;
    }[];
    score: number;
    comments: string;
    date: Date;
  };
}

class CreateVisit {
  public async execute({
    restaurantId,
    visitOptions: { order, score, comments, date },
  }: Request): Promise<RestaurantVisit> {
    const restaurantVisit = await getManager().transaction(
      async entityManager => {
        const newVisit = entityManager.create(RestaurantVisit, {
          restaurant_id: restaurantId,
          comments,
          score,
          date,
          order_total: order.reduce((acc, curr) => {
            return acc + curr.product_quantity * curr.product_value;
          }, 0),
        });

        await entityManager.save(RestaurantVisit, newVisit);

        const allProducts = await entityManager
          .getCustomRepository(RestaurantProductRepository)
          .findManyOrCreate({
            restaurantId,
            order,
          });

        await entityManager
          .getCustomRepository(OrderProductRepository)
          .createMany({
            order,
            newVisitId: newVisit.id,
            products: allProducts,
          });

        return newVisit;
      },
    );

    return restaurantVisit;
  }
}

export default CreateVisit;
