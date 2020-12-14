import { getRepository } from 'typeorm';

import { cacheClient, getCache } from '../../database/cache';
import Visit from '../../database/models/Visit';

interface Request {
  visitId: string;
}

class ShowVisit {
  public async execute({ visitId }: Request): Promise<Visit> {
    const visitRepository = getRepository(Visit);

    const cacheKey = `visits:${visitId}`;

    let visit = await getCache<Visit>(cacheKey);

    if (!visit) {
      visit = await visitRepository
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

      cacheClient.set(cacheKey, JSON.stringify(visit));
    }

    return visit;
  }
}

export default ShowVisit;
