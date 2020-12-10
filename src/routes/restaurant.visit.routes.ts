import { Router } from 'express';

import VisitController from './controllers/VisitController';
import checkPermission from './middlewares/checkPermission';

const restaurantVisitRouter = Router();
const visitController = new VisitController();

restaurantVisitRouter.post(
  '/:restaurantId/visits',
  checkPermission,
  visitController.create,
);
restaurantVisitRouter.get(
  '/:restaurantId/visits',
  checkPermission,
  visitController.index,
);
restaurantVisitRouter.get(
  '/:restaurantId/visits/:visitId',
  checkPermission,
  visitController.show,
);
restaurantVisitRouter.put(
  '/:restaurantId/visits/:visitId',
  checkPermission,
  visitController.update,
);
restaurantVisitRouter.delete(
  '/:restaurantId/visits/:visitId',
  checkPermission,
  visitController.delete,
);

export default restaurantVisitRouter;
