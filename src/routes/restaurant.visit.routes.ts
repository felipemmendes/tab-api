import { Router } from 'express';

import VisitController from './controllers/VisitController';

const restaurantVisitRouter = Router();
const visitController = new VisitController();

restaurantVisitRouter.post('/', visitController.create);
restaurantVisitRouter.get('/', visitController.index);
restaurantVisitRouter.get('/:visitId', visitController.show);
restaurantVisitRouter.put('/:visitId', visitController.update);
restaurantVisitRouter.delete('/:visitId', visitController.delete);

export default restaurantVisitRouter;
