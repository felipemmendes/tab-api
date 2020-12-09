import { getRepository } from 'typeorm';

import Visit from '../database/models/Visit';
import CustomError from '../errors/CustomError';

interface Request {
  visitId: string;
}

class ShowVisit {
  public async execute({ visitId }: Request): Promise<Visit> {
    const visitRepository = getRepository(Visit);
    try {
      const visit = await visitRepository
        .createQueryBuilder('v')
        .select([
          'v.id',
          'v.date',
          'v.comments',
          'v.score',
          'v.total',
          'o.id',
          'o.product_value',
          'o.product_quantity',
          'p.name',
        ])
        .leftJoin('v.order', 'o')
        .leftJoin('o.product', 'p')
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

export default ShowVisit;
