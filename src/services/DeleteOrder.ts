import { getCustomRepository, getRepository } from 'typeorm';
import Order from '../database/models/Order';
import VisitRepository from '../database/repositories/VisitRepository';

interface Request {
  orderId: string;
  visitId: string;
}

class DeleteOrder {
  public async execute({ orderId, visitId }: Request): Promise<void> {
    const orderProduct = getRepository(Order);
    const visitRepository = getCustomRepository(VisitRepository);

    await orderProduct.delete(orderId);

    await visitRepository.updateTotal({ visitId });
  }
}

export default DeleteOrder;
