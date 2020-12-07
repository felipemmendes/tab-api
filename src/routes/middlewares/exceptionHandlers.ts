import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import CustomError from '../../errors/CustomError';

const exceptionHandler = (): ErrorRequestHandler => {
  return (
    error: Error,
    request: Request,
    response: Response,
    _: NextFunction,
  ) => {
    if (error instanceof CustomError) {
      return response
        .status(error.statusCode)
        .json({ status: 'error', message: error.message });
    }

    console.error(error);

    return response
      .status(500)
      .json({ status: 'error', message: 'Internal server error' });
  };
};

export default exceptionHandler;
