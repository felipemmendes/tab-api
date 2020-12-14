import { getCustomRepository } from 'typeorm';
import { invalidateCachePrefix } from '../../database/cache';
import VisitRepository from '../../database/repositories/VisitRepository';

interface Request {
  restaurantId: string;
  visitId: string;
}

class DeleteVisit {
  public async execute({ restaurantId, visitId }: Request): Promise<void> {
    const visitRepository = getCustomRepository(VisitRepository);

    await visitRepository.delete(visitId);

    await invalidateCachePrefix(`list-visits:${restaurantId}:*`);
  }
}

export default DeleteVisit;
