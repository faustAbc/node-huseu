import * as bodyParser from 'body-parser';
import * as middlewares from './middlewares';
import * as config from './config';
import express, { Router } from 'express';
import userRouter from './routers/user/user.router';
import { useMiddlewares } from './middlewares';
import { useRoutes } from './routers';

const appRouter = express.Router();

const routerConfig: [string, Router][] = [['/user', userRouter]];

const server = express();

server.use(bodyParser.json());
server.use(config.API_PREFIX, appRouter);

useRoutes(appRouter, routerConfig);

useMiddlewares(server, [
  middlewares.errorLogger,
  middlewares.errorResponder,
  middlewares.invalidPathHandler,
]);

server.listen(config.PORT).on('listening', () => {
  console.log(`Server started on port ${config.PORT}`);
});

export default server;
