import { getCustomRepository } from 'typeorm';
import OrderProductRepository from '../database/repositories/OrderProductRepository';
import RestaurantProductRepository from '../database/repositories/RestaurantProductRepository';
import RestaurantVisitRepository from '../database/repositories/RestaurantVisitRepository';

interface Request {
  restaurantId: string;
  visitId: string;
  orderId: string;
  orderOptions: {
    product_name: string;
    product_value: number;
    product_quantity: number;
  };
}

class UpdateVisitOrder {
  public async execute({
    restaurantId,
    visitId,
    orderId,
    orderOptions: { product_name, product_value, product_quantity },
  }: Request): Promise<void> {
    const restaurantProductRepository = getCustomRepository(
      RestaurantProductRepository,
    );
    const orderProductRepository = getCustomRepository(OrderProductRepository);
    const restaurantVisitRepository = getCustomRepository(
      RestaurantVisitRepository,
    );

    if (product_name) {
      const product = await restaurantProductRepository.findOneOrCreate({
        product_name,
        restaurantId,
      });

      await orderProductRepository.customUpdate({
        order_id: orderId,
        product_id: product.id,
        product_quantity,
        product_value,
      });
    } else {
      await orderProductRepository.customUpdate({
        order_id: orderId,
        product_quantity,
        product_value,
      });
    }

    await restaurantVisitRepository.updateTotal({
      visitId,
    });
  }
}

export default UpdateVisitOrder;
