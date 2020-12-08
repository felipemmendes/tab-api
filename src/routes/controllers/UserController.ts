import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import CreateUser from '../../services/CreateUser';

class UserController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { username, password } = req.body;

    const createUser = new CreateUser();

    const user = await createUser.execute({ username, password });

    return res.status(200).json(classToClass(user));
  }
}

export default UserController;
