import { ErrorRequestHandler, RequestHandler } from 'express';
import createError, { HttpError } from 'http-errors';

export const errorLogger: ErrorRequestHandler = (err, _req, _res, next) => {
  console.error('\x1b[31m', err);
  next(err);
};

export const errorResponder: ErrorRequestHandler = (err, _req, res, _next) => {
  res.header('Content-Type', 'application/json');
  const error = err instanceof HttpError ? err : createError(err);
  res.status(err.statusCode).json(error);
};

export const invalidPathHandler: RequestHandler = (_req, res, _next) => {
  res.redirect('/error');
};
