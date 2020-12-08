import { getManager, In } from 'typeorm';

import OrderProduct from '../database/models/OrderProduct';
import RestaurantProduct from '../database/models/RestaurantProduct';
import RestaurantVisit from '../database/models/RestaurantVisit';

interface Request {
  userId: string;
  restaurantId: string;
  visitOptions: {
    order: {
      product: string;
      value: number;
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
    let restaurantVisit: RestaurantVisit | undefined;

    await getManager().transaction(async entityManager => {
      restaurantVisit = entityManager.create(RestaurantVisit, {
        restaurant_id: restaurantId,
        comments,
        score,
        date,
      });

      await entityManager.save(RestaurantVisit, restaurantVisit);

      const orderProductsNames = order.map(o => o.product);
      const existentProducts = await entityManager.find(RestaurantProduct, {
        where: {
          name: In(orderProductsNames),
          restaurant_id: restaurantId,
        },
      });
      const existentProductsNames = existentProducts.map(
        product => product.name,
      );
      const productsToCreate = orderProductsNames
        .filter(product => !existentProductsNames.includes(product))
        .filter((value, index, self) => self.indexOf(value) === index)
        .map(product =>
          entityManager.create(RestaurantProduct, {
            name: product,
            restaurant_id: restaurantId,
          }),
        );
      const createdProducts = await entityManager.save(
        RestaurantProduct,
        productsToCreate,
      );
      const allOrderProducts = [...existentProducts, ...createdProducts];
      const orderProducts = order.map(o => {
        return entityManager.create(OrderProduct, {
          product_id: allOrderProducts.find(p => p.name === o.product)!.id,
          value: o.value,
          restaurant_visit_id: restaurantVisit!.id,
        });
      });

      await entityManager.save(OrderProduct, orderProducts);
    });

    if (!restaurantVisit) {
      throw new Error();
    }

    return restaurantVisit;
  }
}

export default CreateVisit;
