export type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt?: Date;
};

export type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
};

export type LoginFormData = {
  email: string;
  password: string;
};

export type SignupFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
};
