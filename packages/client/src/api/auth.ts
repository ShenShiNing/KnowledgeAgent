import apiClient from './client';
import type { User } from '@/types/auth';

export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  username: string;
  email: string;
  password: string;
};

export type RefreshTokenRequest = {
  refreshToken: string;
};

export type AuthResponse = {
  user: User;
  accessToken: string;
  refreshToken: string;
};

export type RefreshTokenResponse = {
  accessToken: string;
  refreshToken: string;
};

/**
 * Login with email and password
 */
export async function login(request: LoginRequest): Promise<AuthResponse> {
  const { data } = await apiClient.post<AuthResponse>('/auth/login', request);
  return data;
}

/**
 * Register a new user
 */
export async function register(
  request: RegisterRequest
): Promise<AuthResponse> {
  const { data } = await apiClient.post<AuthResponse>(
    '/auth/register',
    request
  );
  return data;
}

/**
 * Refresh access token using refresh token
 */
export async function refreshToken(
  request: RefreshTokenRequest
): Promise<RefreshTokenResponse> {
  const { data } = await apiClient.post<RefreshTokenResponse>(
    '/auth/refresh',
    request
  );
  return data;
}

/**
 * Logout current user
 */
export async function logout(refreshToken: string): Promise<void> {
  await apiClient.post('/auth/logout', { refreshToken });
}

/**
 * Logout from all devices
 */
export async function logoutAll(): Promise<void> {
  await apiClient.post('/auth/logout-all');
}

/**
 * Get current user
 */
export async function getCurrentUser(): Promise<{ user: User }> {
  const { data } = await apiClient.get<{ user: User }>('/auth/me');
  return data;
}
