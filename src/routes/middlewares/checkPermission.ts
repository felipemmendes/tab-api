import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import Order from '../../database/models/Order';
import Product from '../../database/models/Product';
import Restaurant from '../../database/models/Restaurant';
import Visit from '../../database/models/Visit';

const checkPermission = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { userId } = req.user;
  const { restaurantId, visitId, orderId, productId } = req.params;

  if (visitId) {
    if (orderId) {
      const orderRepository = getRepository(Order);

      await orderRepository
        .createQueryBuilder('o')
        .select('o.id')
        .leftJoin('o.visit', 'v')
        .innerJoin('v.restaurant', 'r')
        .where('o.id = :orderId', { orderId })
        .andWhere('o.visit_id = :visitId', { visitId })
        .andWhere('v.restaurant_id = :restaurantId', { restaurantId })
        .andWhere('r.user_id = :userId', { userId })
        .getOneOrFail();

      req.restaurant = {
        restaurantId,
        visitId,
        orderId,
      };
    } else {
      const visitRepository = getRepository(Visit);

      await visitRepository
        .createQueryBuilder('v')
        .select('v.id')
        .innerJoin('v.restaurant', 'r')
        .where('v.id = :visitId', { visitId })
        .andWhere('v.restaurant_id = :restaurantId', { restaurantId })
        .andWhere('r.user_id = :userId', { userId })
        .getOneOrFail();

      req.restaurant = {
        restaurantId,
        visitId,
      };
    }
  } else if (productId) {
    const productRepository = getRepository(Product);

    await productRepository
      .createQueryBuilder('p')
      .select('p.id')
      .innerJoin('p.restaurant', 'r')
      .where('p.id = :productId', { productId })
      .andWhere('v.restaurant_id = :restaurantId', { restaurantId })
      .andWhere('r.user_id = :userId', { userId })
      .getOneOrFail();

    req.restaurant = {
      restaurantId,
      productId,
    };
  } else {
    const restaurantRepository = getRepository(Restaurant);
    await restaurantRepository.findOneOrFail({
      where: {
        id: restaurantId,
        user_id: userId,
      },
    });

    req.restaurant = {
      restaurantId,
    };
  }

  return next();
};

export default checkPermission;
