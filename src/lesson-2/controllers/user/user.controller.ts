import express from 'express';
import * as UserService from './user.service';
import { User, UserSearchOptions } from './user.types';

const userRouter = express.Router();

userRouter.get('/:id', (req, res) => {
  const { id } = req.params;

  const user = UserService.getUserBuId(id);
  res.send(user);
});

userRouter.post('/', (req, res) => {
  const newUser = req.body as Omit<User, 'id'>;
  const dbUser = UserService.createNewUser(newUser);
  res.send(dbUser);
});

userRouter.patch('/:id', (req, res) => {
  const { id } = req.params;
  const newUser = { ...req.body, id } as User;
  const dbUser = UserService.createNewUser(newUser);
  res.send(dbUser);
});

userRouter.get<unknown, unknown, unknown, UserSearchOptions>(
  '/',
  (req, res) => {
    const { sortFiled, search, skip, top } = req.query;
    console.log(123);

    const users = UserService.getUsers({ sortFiled, search, skip, top });
    res.send(users);
  }
);

userRouter.delete('/:id', (req, res) => {
  const { id } = req.params;

  const user = UserService.removeUser(id);
  res.send(user);
});

export default userRouter;
