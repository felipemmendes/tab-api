import { Request, Response } from 'express';

import CreateVisit from '../../services/CreateVisit';
import ListVisits from '../../services/ListVisits';
import ShowVisit from '../../services/ShowVisit';
import UpdateVisit from '../../services/UpdateVisit';

class VisitController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { userId } = req.user;
    const { restaurantId } = req.restaurant;
    const { visitOptions } = req.body;

    const createVisit = new CreateVisit();

    const visit = await createVisit.execute({
      userId,
      restaurantId,
      visitOptions,
    });

    return res.status(200).json(visit);
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const { restaurantId } = req.restaurant;

    const listVisits = new ListVisits();

    const visits = await listVisits.execute({
      restaurantId,
    });

    return res.status(200).json(visits);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { visitId } = req.params;

    const showVisit = new ShowVisit();

    const visit = await showVisit.execute({
      visitId,
    });

    return res.status(200).json(visit);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { visitId } = req.params;
    const { visitOptions } = req.body;

    const updateVisit = new UpdateVisit();

    await updateVisit.execute({ visitId, visitOptions });

    return res.sendStatus(200);
  }
}

export default VisitController;
