import { getCustomRepository } from 'typeorm';

import VisitRepository from '../database/repositories/VisitRepository';

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
  }
}

export default UpdateVisit;
