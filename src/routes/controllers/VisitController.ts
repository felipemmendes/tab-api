import { Request, Response } from 'express';

import CreateVisit from '../../services/CreateVisit';

class VisitController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { userId } = req.user;
    const { restaurantId } = req.params;
    const { visitOptions } = req.body;

    const createVisit = new CreateVisit();

    const restaurantVisit = await createVisit.execute({
      userId,
      restaurantId,
      visitOptions,
    });

    return res.status(200).json(restaurantVisit);
  }
}

export default VisitController;
