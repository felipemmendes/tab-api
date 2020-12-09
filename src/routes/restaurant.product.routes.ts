import { Router } from 'express';

import ProductController from './controllers/ProductController';

const restaurantProductRouter = Router();
const productController = new ProductController();

restaurantProductRouter.get('/', productController.index);
restaurantProductRouter.post('/', productController.create);
restaurantProductRouter.get('/:productId', productController.show);

export default restaurantProductRouter;
