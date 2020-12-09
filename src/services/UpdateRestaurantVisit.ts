import { getCustomRepository } from 'typeorm';

import RestaurantVisitRepository from '../database/repositories/RestaurantVisitRepository';

interface Request {
  visitId: string;
  visitOptions: {
    comments: string;
    score: number;
    date: Date;
  };
}

class UpdateRestaurantVisit {
  public async execute({ visitId, visitOptions }: Request): Promise<void> {
    const restaurantVisitRepository = getCustomRepository(
      RestaurantVisitRepository,
    );
    await restaurantVisitRepository.customUpdate({ visitId, visitOptions });
  }
}

export default UpdateRestaurantVisit;
