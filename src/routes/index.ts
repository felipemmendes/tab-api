import { Router } from 'express';

import userRoutes from './user.routes';
import sessionRoutes from './session.routes';
import restaurantRoutes from './restaurant.routes';
import checkAuth from './middlewares/checkAuth';

const routes = Router();

routes.get('/', (req, res) => {
  return res.json({ message: 'home' });
});

routes.use('/users', userRoutes);
routes.use('/sessions', sessionRoutes);
routes.use('/restaurants', checkAuth, restaurantRoutes);

export default routes;
