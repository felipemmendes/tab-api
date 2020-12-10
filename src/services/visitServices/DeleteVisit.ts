import { getCustomRepository } from 'typeorm';
import VisitRepository from '../../database/repositories/VisitRepository';

interface Request {
  visitId: string;
}

class DeleteVisit {
  public async execute({ visitId }: Request): Promise<void> {
    const visitRepository = getCustomRepository(VisitRepository);

    await visitRepository.delete(visitId);
  }
}

export default DeleteVisit;
