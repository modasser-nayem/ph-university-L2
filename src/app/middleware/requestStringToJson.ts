// incoming req.body.data (string) TO req.body (JSON) convert

import { RequestHandler } from 'express';

/**
 * Takes incoming req.body.data (string) To convert req.body (JSON).
 * @returns req.body (JSON data)
 */
export const requestStringToJson: RequestHandler = (req, res, next) => {
  req.body = JSON.parse(req.body.data);
  next();
};
