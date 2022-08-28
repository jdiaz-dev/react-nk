export type JwtDto = {
  token: string;
  userId: string;
};

export type LoginMutation = {
  logIn: JwtDto;
};

export type LoginRequest = {
  input: {
    email: string;
    password: string;
  };
};
