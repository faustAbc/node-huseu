export * from './error';
import { Express, RequestHandler, ErrorRequestHandler } from 'express';

export const useMiddlewares = (
  app: Express,
  handlers: (RequestHandler | ErrorRequestHandler)[]
) => {
  handlers.forEach((handler) => {
    app.use(handler);
  });
};
