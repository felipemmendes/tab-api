import { getCustomRepository, getRepository } from 'typeorm';

import Order from '../../database/models/Order';
import Product from '../../database/models/Product';
import OrderRepository from '../../database/repositories/OrderRepository';
import VisitRepository from '../../database/repositories/VisitRepository';

interface Request {
  restaurantId: string;
  visitId: string;
  order: {
    product_name: string;
    product_value: number;
    product_quantity: number;
  };
}

class CreateOrder {
  public async execute({
    restaurantId,
    visitId,
    order,
  }: Request): Promise<Order> {
    const productRepository = getRepository(Product);
    const orderRepository = getCustomRepository(OrderRepository);
    const visitRepository = getCustomRepository(VisitRepository);

    let product = await productRepository.findOne({
      where: {
        name: order.product_name,
        restaurant_id: restaurantId,
      },
    });

    if (!product) {
      product = productRepository.create({
        name: order.product_name,
        restaurant_id: restaurantId,
      });

      await productRepository.save(product);
    }

    const newVisitOrder = orderRepository.create({
      product_id: product.id,
      product_value: order.product_value,
      product_quantity: order.product_quantity,
      visit_id: visitId,
    });

    await orderRepository.save(newVisitOrder);

    await visitRepository.updateTotal({
      visitId,
    });

    return newVisitOrder;
  }
}

export default CreateOrder;
