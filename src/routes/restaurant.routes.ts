import { Router } from 'express';

import ProductController from './controllers/ProductController';
import RestaurantController from './controllers/RestaurantController';
import VisitController from './controllers/VisitController';

const restaurantRouter = Router();
const productController = new ProductController();
const restaurantController = new RestaurantController();
const visitController = new VisitController();

restaurantRouter.get('/', restaurantController.index);
restaurantRouter.get('/:restaurantId', restaurantController.show);
restaurantRouter.get('/:restaurantId/products', productController.index);
restaurantRouter.get(
  '/:restaurantId/products/:productId',
  productController.show,
);
restaurantRouter.post('/', restaurantController.create);
restaurantRouter.post('/:restaurantId', visitController.create);

export default restaurantRouter;
