import { getManager } from 'typeorm';
import OrderRepository from '../../database/repositories/OrderRepository';
import ProductRepository from '../../database/repositories/ProductRepository';
import VisitRepository from '../../database/repositories/VisitRepository';

interface Request {
  productId: string;
}

class DeleteProduct {
  public async execute({ productId }: Request): Promise<void> {
    await getManager().transaction(async entityManager => {
      const visitsId = await entityManager
        .getCustomRepository(OrderRepository)
        .find({
          where: {
            product_id: productId,
          },
          select: ['visit_id'],
        })
        .then(response => response.map(r => r.visit_id));

      await entityManager
        .getCustomRepository(ProductRepository)
        .delete(productId);

      if (visitsId.length >= 1) {
        await entityManager
          .getCustomRepository(VisitRepository)
          .updateManyTotal({ visitsId });
      }
    });
  }
}

export default DeleteProduct;
