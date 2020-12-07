import { Router } from 'express';
import { classToClass } from 'class-transformer';

import CreateSession from '../services/CreateSession';

const sessionRoutes = Router();

sessionRoutes.post('/', async (req, res) => {
  const { username, password } = req.body;

  const createSession = new CreateSession();

  const { user, token } = await createSession.execute({ username, password });

  res.status(200).json({ user: classToClass(user), token });
});

export default sessionRoutes;
