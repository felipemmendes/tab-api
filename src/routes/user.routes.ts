import { Router } from 'express';
import { classToClass } from 'class-transformer';

import CreateUser from '../services/CreateUser';

const userRoutes = Router();

userRoutes.post('/', async (req, res) => {
  const { username, password } = req.body;

  const createUser = new CreateUser();

  const user = await createUser.execute({ username, password });

  res.status(200).json(classToClass(user));
});

export default userRoutes;
