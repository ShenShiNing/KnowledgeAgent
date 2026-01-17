import apiClient from './client';

export type LoginRequest = {
  email: string;
  password: string;
};

export type SignupRequest = {
  name: string;
  email: string;
  password: string;
};

export type AuthResponse = {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
};

export type User = {
  id: string;
  name: string;
  email: string;
};

/**
 * Login with email and password
 */
export async function login(request: LoginRequest): Promise<AuthResponse> {
  const { data } = await apiClient.post<AuthResponse>('/auth/login', request);
  return data;
}

/**
 * Sign up a new user
 */
export async function signup(request: SignupRequest): Promise<AuthResponse> {
  const { data } = await apiClient.post<AuthResponse>('/auth/signup', request);
  return data;
}

/**
 * Logout current user
 */
export async function logout(): Promise<void> {
  await apiClient.post('/auth/logout');
}

/**
 * Get current user
 */
export async function getCurrentUser(): Promise<User> {
  const { data } = await apiClient.get<User>('/auth/me');
  return data;
}
