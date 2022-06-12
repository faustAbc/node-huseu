import express, { Request } from 'express';
import validationMiddleware from '../../middlewares/validation';
import UserDto from './user.dto';
import * as UserService from './user.service';
import { User, UserSearchOptions } from './user.types';

const userRouter = express.Router();

userRouter.get('/:id', (req, res) => {
  const { id } = req.params;
  const user = UserService.getUserBuId(id);

  res.json(user);
});

userRouter.post(
  '/',
  validationMiddleware(UserDto),
  (req: Request<Record<string, never>, Omit<User, 'id'>>, res) => {
    const newUser = req.body;
    const dbUser = UserService.createNewUser(newUser);

    res.json(dbUser);
  }
);

userRouter.patch(
  '/:id',
  validationMiddleware(UserDto, true),
  (req: Request<{ id: User['id'] }, Omit<User, 'id'>>, res) => {
    const { id } = req.params;
    const newUser = { ...req.body, id };
    const dbUser = UserService.createNewUser(newUser);

    res.json(dbUser);
  }
);

/**
 * Autosuggest
 */
userRouter.get(
  '/',
  (req: Request<unknown, unknown, unknown, UserSearchOptions>, res) => {
    const { sortFiled, search, skip, top } = req.query;
    const users = UserService.getUsers({ sortFiled, search, skip, top });

    res.json(users);
  }
);

userRouter.delete('/:id', (req, res) => {
  const { id } = req.params;
  const user = UserService.removeUser(id);

  res.json(user);
});

export default userRouter;
