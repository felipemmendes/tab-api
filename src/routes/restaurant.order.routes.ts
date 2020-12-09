import { Router } from 'express';

import OrderController from './controllers/OrderController';

const restaurantOrderRouter = Router();
const orderController = new OrderController();

restaurantOrderRouter.post('/:visitId/orders', orderController.create);
restaurantOrderRouter.put('/:visitId/orders/:orderId', orderController.update);
restaurantOrderRouter.delete(
  '/:visitId/orders/:orderId',
  orderController.delete,
);

export default restaurantOrderRouter;
