import { Router } from 'express';

import restaurantVisitRoutes from './restaurant.visit.routes';
import restaurantOrderRoutes from './restaurant.order.routes';
import restaurantProductRoutes from './restaurant.product.routes';
import checkPermission from './middlewares/checkPermission';
import RestaurantController from './controllers/RestaurantController';

const restaurantRouter = Router();
const restaurantController = new RestaurantController();

restaurantRouter.post('/', restaurantController.create);
restaurantRouter.get('/', restaurantController.index);
restaurantRouter.get(
  '/:restaurantId',
  checkPermission,
  restaurantController.show,
);
restaurantRouter.put(
  '/:restaurantId',
  checkPermission,
  restaurantController.update,
);
restaurantRouter.delete(
  '/:restaurantId',
  checkPermission,
  restaurantController.delete,
);

restaurantRouter.use('/', restaurantVisitRoutes);

restaurantRouter.use('/', restaurantOrderRoutes);

restaurantRouter.use('/', restaurantProductRoutes);

export default restaurantRouter;
