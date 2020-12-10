import { Router } from 'express';

import ProductController from './controllers/ProductController';
import checkPermission from './middlewares/checkPermission';

const restaurantProductRouter = Router();
const productController = new ProductController();

restaurantProductRouter.get(
  '/:restaurantId/products/',
  checkPermission,
  productController.index,
);
restaurantProductRouter.post(
  '/:restaurantId/products/',
  checkPermission,
  productController.create,
);
restaurantProductRouter.get(
  '/:restaurantId/products/:productId',
  checkPermission,
  productController.show,
);
restaurantProductRouter.put(
  '/:restaurantId/products/:productId',
  checkPermission,
  productController.update,
);
restaurantProductRouter.delete(
  '/:restaurantId/products/:productId',
  checkPermission,
  productController.delete,
);

export default restaurantProductRouter;
