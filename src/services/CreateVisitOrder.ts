import { getCustomRepository, getRepository } from 'typeorm';

import OrderProduct from '../database/models/OrderProduct';
import RestaurantProduct from '../database/models/RestaurantProduct';
import RestaurantVisitRepository from '../database/repositories/RestaurantVisitRepository';

interface Request {
  restaurantId: string;
  visitId: string;
  order: {
    product_name: string;
    product_value: number;
    product_quantity: number;
  };
}

class CreateVisitOrder {
  public async execute({
    restaurantId,
    visitId,
    order,
  }: Request): Promise<OrderProduct> {
    const restaurantProductRepository = getRepository(RestaurantProduct);
    const orderProductRepository = getRepository(OrderProduct);
    const restaurantVisitRepository = getCustomRepository(
      RestaurantVisitRepository,
    );

    let product = await restaurantProductRepository.findOne({
      where: {
        name: order.product_name,
        restaurant_id: restaurantId,
      },
    });

    if (!product) {
      product = restaurantProductRepository.create({
        name: order.product_name,
        restaurant_id: restaurantId,
      });

      await restaurantProductRepository.save(product);
    }

    const newVisitOrder = orderProductRepository.create({
      product_id: product.id,
      product_value: order.product_value,
      product_quantity: order.product_quantity,
      restaurant_visit_id: visitId,
    });

    await orderProductRepository.save(newVisitOrder);

    await restaurantVisitRepository.updateTotal({
      visitId,
    });

    return newVisitOrder;
  }
}

export default CreateVisitOrder;
