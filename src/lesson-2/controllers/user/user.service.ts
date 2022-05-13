import UserDb from './user.db';
import { PartialUserWithId, User } from './user.types';

export const getUserBuId = (id: User['id']) => UserDb.getById(id);

export const createNewUser = (newUser: Omit<User, 'id'>) =>
  UserDb.createUser(newUser);

export const updateUser = (user: PartialUserWithId) => UserDb.updateUser(user);

export const removeUser = (id: User['id']) => UserDb.removeUser(id);

export const getUsers = UserDb.getUsers.bind(UserDb);
