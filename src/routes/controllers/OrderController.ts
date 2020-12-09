import { Request, Response } from 'express';

import CreateOrder from '../../services/CreateOrder';
import UpdateOrder from '../../services/UpdateOrder';
import DeleteOrder from '../../services/DeleteOrder';

class OrderController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { restaurantId } = req.restaurant;
    const { visitId } = req.params;
    const { order } = req.body;

    const createOrder = new CreateOrder();

    const newOrder = await createOrder.execute({
      restaurantId,
      visitId,
      order,
    });

    return res.json(newOrder);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { restaurantId } = req.restaurant;
    const { visitId, orderId } = req.params;
    const { orderOptions } = req.body;

    const updateOrder = new UpdateOrder();

    await updateOrder.execute({
      restaurantId,
      visitId,
      orderId,
      orderOptions,
    });

    return res.sendStatus(200);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { orderId, visitId } = req.params;

    const deleteOrder = new DeleteOrder();

    await deleteOrder.execute({
      orderId,
      visitId,
    });

    return res.sendStatus(200);
  }
}

export default OrderController;
