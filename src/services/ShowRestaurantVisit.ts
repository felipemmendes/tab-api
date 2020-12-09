import { getRepository } from 'typeorm';

import RestaurantVisit from '../database/models/RestaurantVisit';
import CustomError from '../errors/CustomError';

interface Request {
  visitId: string;
}

class ShowRestaurantVisit {
  public async execute({ visitId }: Request): Promise<RestaurantVisit> {
    const visitRepository = getRepository(RestaurantVisit);
    try {
      const visit = await visitRepository
        .createQueryBuilder('v')
        .select([
          'v.id',
          'v.date',
          'v.comments',
          'v.score',
          'v.order_total',
          'o.id',
          'o.product_value',
          'o.product_quantity',
          'p.name',
        ])
        .innerJoin('v.order', 'o')
        .innerJoin('o.product', 'p')
        .where('v.id = :visitId', { visitId })
        .getOneOrFail();

      return visit;
    } catch (err) {
      if (err instanceof Error && err.name === 'EntityNotFound') {
        throw new CustomError({
          message: 'Visit not found',
          statusCode: 404,
        });
      } else {
        throw new Error(err);
      }
    }
  }
}

export default ShowRestaurantVisit;
