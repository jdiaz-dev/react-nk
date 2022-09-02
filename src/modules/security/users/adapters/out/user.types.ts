export type UserModel = {
  userId?: string;
  names: string;
  surnames: string;
  email: string;
  password?: string;
};

export type CreateUserResponse = {
  createUser: UserModel;
};

export type CreateUserRequest = {
  input: UserModel;
};
