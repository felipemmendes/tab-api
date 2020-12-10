import { getRepository } from 'typeorm';

import Visit from '../../database/models/Visit';

interface Request {
  visitId: string;
}

class ShowVisit {
  public async execute({ visitId }: Request): Promise<Visit> {
    const visitRepository = getRepository(Visit);

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
  }
}

export default ShowVisit;
