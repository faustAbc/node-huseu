import express from 'express';
import userRouter from './controllers/user/user.controller';
import * as bodyParser from 'body-parser';

const appRouter = express.Router();

([['user', userRouter]] as const).forEach(([name, router]) => {
  appRouter.use(name, router);
});

const server = express();

server.use('/api/v1', userRouter);
server.use(bodyParser.json());

server.listen(3000).on('listening', () => {
  console.log('Server started on port 3000');
});

export default server;
