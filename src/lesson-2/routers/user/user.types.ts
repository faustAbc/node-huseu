export interface User {
  id: string;
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;
}

export type PartialUserWithId = Required<Pick<User, 'id'>> &
  Partial<Omit<User, 'id'>>;

export interface UserSearchOptions {
  sortFiled: keyof User;
  search?: string;
  top?: number;
  skip?: number;
}
