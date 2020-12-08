import { Router } from 'express';

import ProductController from './controllers/ProductController';
import RestaurantController from './controllers/RestaurantController';
import VisitController from './controllers/VisitController';
import checkPermission from './middlewares/checkPermission';

const restaurantRouter = Router();
const productController = new ProductController();
const restaurantController = new RestaurantController();
const visitController = new VisitController();

restaurantRouter.get('/', restaurantController.index);
restaurantRouter.post('/', restaurantController.create);
restaurantRouter.get(
  '/:restaurantId',
  checkPermission,
  restaurantController.show,
);
restaurantRouter.post(
  '/:restaurantId',
  checkPermission,
  visitController.create,
);
restaurantRouter.get(
  '/:restaurantId/visits',
  checkPermission,
  visitController.index,
);
restaurantRouter.put(
  '/:restaurantId',
  checkPermission,
  restaurantController.update,
);
restaurantRouter.get(
  '/:restaurantId/products',
  checkPermission,
  productController.index,
);
restaurantRouter.get(
  '/:restaurantId/products/:productId',
  checkPermission,
  productController.show,
);

export default restaurantRouter;
