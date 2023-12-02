import { NextFunction, Request, Response } from 'express';

const notFound = (
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  next: NextFunction,
) => {
  return res.status(404).json({
    success: false,
    message: 'API not found!',
    error: '',
  });
};

export default notFound;
