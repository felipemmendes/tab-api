import { getCustomRepository, getRepository } from 'typeorm';
import Order from '../../database/models/Order';
import VisitRepository from '../../database/repositories/VisitRepository';

interface Request {
  orderId: string;
  visitId: string;
}

class DeleteOrder {
  public async execute({ orderId, visitId }: Request): Promise<void> {
    const orderRepository = getRepository(Order);
    const visitRepository = getCustomRepository(VisitRepository);

    await orderRepository.delete(orderId);

    await visitRepository.updateTotal({ visitId });
  }
}

export default DeleteOrder;
