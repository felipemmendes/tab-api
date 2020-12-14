import { getCustomRepository } from 'typeorm';

import { invalidateCachePrefix } from '../../database/cache';
import VisitRepository from '../../database/repositories/VisitRepository';

interface Request {
  visitId: string;
  visitOptions: {
    comments: string;
    score: number;
    date: Date;
  };
}

class UpdateVisit {
  public async execute({ visitId, visitOptions }: Request): Promise<void> {
    const visitRepository = getCustomRepository(VisitRepository);
    await visitRepository.customUpdate({ visitId, visitOptions });

    await invalidateCachePrefix(`visits:${visitId}`);
  }
}

export default UpdateVisit;
