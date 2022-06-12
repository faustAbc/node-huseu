export { default as userRouter } from './user/user.router';
import { Router } from 'express';

export const useRoutes = (app: Router, routes: [string, Router][]) => {
  routes.forEach(([path, route]) => {
    app.use(path, route);
  });
};
