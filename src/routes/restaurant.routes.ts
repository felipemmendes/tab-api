import { Router } from 'express';

import RestaurantController from './controllers/RestaurantController';
import VisitController from './controllers/VisitController';

const restaurantRouter = Router();
const restaurantController = new RestaurantController();
const visitController = new VisitController();

restaurantRouter.get('/', restaurantController.index);
restaurantRouter.get('/:restaurantId', restaurantController.show);
restaurantRouter.post('/', restaurantController.create);
restaurantRouter.post('/:restaurantId', visitController.create);

export default restaurantRouter;
