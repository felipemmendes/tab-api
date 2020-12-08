import { Response, Request, NextFunction, ErrorRequestHandler } from 'express';
import CustomError from '../../errors/CustomError';

const exceptionHandler = (): ErrorRequestHandler => {
  return (error: Error, req: Request, res: Response, _: NextFunction) => {
    if (error instanceof CustomError) {
      return res
        .status(error.statusCode)
        .json({ status: 'error', message: error.message });
    }

    console.error(error);

    return res
      .status(500)
      .json({ status: 'error', message: 'Internal server error' });
  };
};

export default exceptionHandler;
