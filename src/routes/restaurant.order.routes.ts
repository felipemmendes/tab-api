import { Router } from 'express';

import OrderController from './controllers/OrderController';
import checkPermission from './middlewares/checkPermission';

const restaurantOrderRouter = Router();
const orderController = new OrderController();

restaurantOrderRouter.post(
  '/:restaurantId/visits/:visitId/orders',
  checkPermission,
  orderController.create,
);
restaurantOrderRouter.put(
  '/:restaurantId/visits/:visitId/orders/:orderId',
  checkPermission,
  orderController.update,
);
restaurantOrderRouter.delete(
  '/:restaurantId/visits/:visitId/orders/:orderId',
  checkPermission,
  orderController.delete,
);

export default restaurantOrderRouter;
