import { Request, Response } from 'express';

import CreateRestaurantVisit from '../../services/CreateRestaurantVisit';
import ListRestaurantVisits from '../../services/ListRestaurantVisits';
import ShowRestaurantVisit from '../../services/ShowRestaurantVisit';
import UpdateRestaurantVisit from '../../services/UpdateRestaurantVisit';

class VisitController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { userId } = req.user;
    const { restaurantId } = req.restaurant;
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
    const { restaurantId } = req.restaurant;

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

  public async update(req: Request, res: Response): Promise<Response> {
    const { visitId } = req.params;
    const { visitOptions } = req.body;

    const updateRestaurantVisit = new UpdateRestaurantVisit();

    await updateRestaurantVisit.execute({ visitId, visitOptions });

    return res.sendStatus(200);
  }
}

export default VisitController;
