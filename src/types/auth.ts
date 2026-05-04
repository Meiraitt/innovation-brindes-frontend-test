export type LoginCredentials = {
  password: string;
  rememberMe: boolean;
  user: string;
};

export type AuthUser = {
  groupId: string;
  groupName: string;
  id: string;
  name: string;
};

export type LoginResponse = {
  status: number;
  message: string;
  user?: AuthUser;
};
