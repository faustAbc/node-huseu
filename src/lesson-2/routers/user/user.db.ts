import { User, UserSearchOptions } from './user.types';
import { nanoid } from 'nanoid';
import faker from '@faker-js/faker';
import createError from 'http-errors';

class UserDB {
  users: User[];

  constructor() {
    this.users = Array.from({ length: 1e2 }, () => ({
      age: Math.floor(Math.random() * 100),
      id: nanoid(),
      isDeleted: Math.random() > 0.5,
      login: faker.internet.userName(),
      password: faker.internet.password(),
    }));
  }

  getById(id: User['id']) {
    return this.users.find((user) => user.id === id);
  }

  createUser(newUser: Pick<User, 'age' | 'login' | 'password'>) {
    const user: User = { ...newUser, id: nanoid(), isDeleted: false };
    this.users.push(user);
    return user;
  }

  updateUser(updatedUser: Partial<User>) {
    const userIndex = this.users.findIndex(
      (user) => user.id === updatedUser.id
    );
    const newUser = { ...this.users[userIndex], ...updatedUser };

    this.users.splice(userIndex, 1, newUser);
    return newUser;
  }

  removeUser(id: User['id']) {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new createError.NotFound('User not found');
    }

    if (user.isDeleted) {
      throw new createError.BadRequest('User already deleted');
    }

    user.isDeleted = true;
    return user;
  }

  getUsers({
    sortFiled = 'login',
    skip = 0,
    top = 1e2,
    search,
  }: UserSearchOptions) {
    let users = this.users.filter((user) => !user.isDeleted);
    const typedSortField = sortFiled as keyof User;

    users.sort(
      (a, b) => (b[typedSortField] as number) - (a[typedSortField] as number)
    );

    if (typeof search === 'string') {
      const testRegex = new RegExp(search, 'i');
      users = users.filter((user) => testRegex.test(user.login));
    }

    return users.slice(skip, top + skip);
  }
}

export default new UserDB();
