import { getCustomRepository } from 'typeorm';
import OrderRepository from '../database/repositories/OrderRepository';
import ProductRepository from '../database/repositories/ProductRepository';
import VisitRepository from '../database/repositories/VisitRepository';

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

class UpdateOrder {
  public async execute({
    restaurantId,
    visitId,
    orderId,
    orderOptions: { product_name, product_value, product_quantity },
  }: Request): Promise<void> {
    const productRepository = getCustomRepository(ProductRepository);
    const orderRepository = getCustomRepository(OrderRepository);
    const visitRepository = getCustomRepository(VisitRepository);

    if (product_name) {
      const product = await productRepository.findOneOrCreate({
        product_name,
        restaurantId,
      });

      await orderRepository.customUpdate({
        order_id: orderId,
        product_id: product.id,
        product_quantity,
        product_value,
      });
    } else {
      await orderRepository.customUpdate({
        order_id: orderId,
        product_quantity,
        product_value,
      });
    }

    await visitRepository.updateTotal({ visitId });
  }
}

export default UpdateOrder;
