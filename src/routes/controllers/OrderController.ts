import { Request, Response } from 'express';

import CreateVisitOrder from '../../services/CreateVisitOrder';
import UpdateVisitOrder from '../../services/UpdateVisitOrder';
import DeleteVisitOrder from '../../services/DeleteVisitOrder';

class OrderController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { restaurantId } = req.restaurant;
    const { visitId } = req.params;
    const { order } = req.body;

    const createVisitOrder = new CreateVisitOrder();

    const visitOrder = await createVisitOrder.execute({
      restaurantId,
      visitId,
      order,
    });

    return res.json(visitOrder);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { restaurantId } = req.restaurant;
    const { visitId, orderId } = req.params;
    const { orderOptions } = req.body;

    const updateVisitOrder = new UpdateVisitOrder();

    await updateVisitOrder.execute({
      restaurantId,
      visitId,
      orderId,
      orderOptions,
    });

    return res.sendStatus(200);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { orderId, visitId } = req.params;

    const deleteVisitOrder = new DeleteVisitOrder();

    await deleteVisitOrder.execute({
      orderId,
      visitId,
    });

    return res.sendStatus(200);
  }
}

export default OrderController;
