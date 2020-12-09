import { getCustomRepository, getRepository } from 'typeorm';
import OrderProduct from '../database/models/OrderProduct';
import RestaurantVisitRepository from '../database/repositories/RestaurantVisitRepository';

interface Request {
  orderId: string;
  visitId: string;
}

class DeleteVisitOrder {
  public async execute({ orderId, visitId }: Request): Promise<void> {
    const orderProduct = getRepository(OrderProduct);
    const restaurantVisitRepository = getCustomRepository(
      RestaurantVisitRepository,
    );

    await orderProduct.delete(orderId);

    await restaurantVisitRepository.updateTotal({
      visitId,
    });
  }
}

export default DeleteVisitOrder;
