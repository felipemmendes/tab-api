import { Request, Response } from 'express';

import CreateRestaurantVisit from '../../services/CreateRestaurantVisit';
import ListRestaurantVisits from '../../services/ListRestaurantVisits';
import ShowRestaurantVisit from '../../services/ShowRestaurantVisit';

class VisitController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { userId } = req.user;
    const { id: restaurantId } = req.restaurant.restaurant;
    const { visitOptions } = req.body;

    const createRestaurantVisit = new CreateRestaurantVisit();

    const restaurantVisit = await createRestaurantVisit.execute({
      userId,
      restaurantId,
      visitOptions,
    });

    return res.status(200).json(restaurantVisit);
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const { id: restaurantId } = req.restaurant.restaurant;

    const listRestaurantVisits = new ListRestaurantVisits();

    const restaurantVisit = await listRestaurantVisits.execute({
      restaurantId,
    });

    return res.status(200).json(restaurantVisit);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { visitId } = req.params;

    const showRestaurantVisit = new ShowRestaurantVisit();

    const restaurantVisit = await showRestaurantVisit.execute({
      visitId,
    });

    return res.status(200).json(restaurantVisit);
  }
}

export default VisitController;
