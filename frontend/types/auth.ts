export type UserRegisterCredentials = {
  name?: string;
  email?: string;
  password?: string;
};

export type UserSignInCredentails = {
  email?: string;
  password?: string;
};

export type User = {
  id: string;
  uuid: string;
  name: string;
  phone: string;
  email: string;
  role: string;
  status: string;
  type: string;
  avatar: string | null | undefined;
  createdAt: string;
  updatedAt: string;
};

export type AuthenticatedUser = {
  user: User;
  token: string;
};
