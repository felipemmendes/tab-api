import { getManager } from 'typeorm';

import { invalidateCachePrefix } from '../../database/cache';
import Visit from '../../database/models/Visit';
import ProductRepository from '../../database/repositories/ProductRepository';
import OrderRepository from '../../database/repositories/OrderRepository';

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
  }: Request): Promise<Visit> {
    const restaurantVisit = await getManager().transaction(
      async entityManager => {
        const newVisit = entityManager.create(Visit, {
          restaurant_id: restaurantId,
          comments,
          score,
          date,
          total: order.reduce((acc, curr) => {
            return acc + curr.product_quantity * curr.product_value;
          }, 0),
        });

        await entityManager.save(Visit, newVisit);

        const allProducts = await entityManager
          .getCustomRepository(ProductRepository)
          .findManyOrCreate({
            restaurantId,
            order,
          });

        await entityManager.getCustomRepository(OrderRepository).createMany({
          order,
          newVisitId: newVisit.id,
          products: allProducts,
        });

        return newVisit;
      },
    );

    await invalidateCachePrefix(`list-visits:${restaurantId}:*`);

    return restaurantVisit;
  }
}

export default CreateVisit;
