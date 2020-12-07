import { Router } from 'express';

import userRoutes from './user.routes';
import sessionRoutes from './session.routes';

const routes = Router();

routes.get('/', (req, res) => {
  return res.json({ message: 'home' });
});

routes.use('/users', userRoutes);
routes.use('/sessions', sessionRoutes);

export default routes;
