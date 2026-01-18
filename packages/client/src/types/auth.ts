export type UserStatus = 'active' | 'inactive' | 'banned';

export type User = {
  id: string;
  username: string;
  email: string;
  status: UserStatus;
  avatar?: string;
  createdAt?: Date;
};

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

export type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
};

export type LoginFormData = {
  email: string;
  password: string;
};

export type SignupFormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword?: string;
};
