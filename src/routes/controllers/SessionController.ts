import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import CreateSession from '../../services/CreateSession';

class SessionController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { username, password } = req.body;

    const createSession = new CreateSession();

    const { user, token } = await createSession.execute({ username, password });

    return res.status(200).json({ user: classToClass(user), token });
  }
}

export default SessionController;
