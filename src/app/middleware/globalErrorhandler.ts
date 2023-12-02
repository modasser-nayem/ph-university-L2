import { NextFunction, Request, Response } from 'express';
import AppError from '../errors/AppError';

const globalErrorHandler = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  err: any,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  next: NextFunction,
) => {
  err.statusCode = err.statusCode || 500;
  // if (Object.keys(err.message).length) {
  //   err.message = 'Something went wrong';
  // }
  err.message = err.message || 'Something went wrong!';

  // CastError
  if (err.name === 'CastError') {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new AppError(400, message);
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new AppError(400, message);
  }

  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
    error: err,
  });
};

export default globalErrorHandler;
