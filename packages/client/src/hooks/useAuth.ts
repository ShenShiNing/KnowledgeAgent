import { useEffect } from 'react';
import { useRouter } from '@tanstack/react-router';
import {
  login,
  register,
  logout as apiLogout,
  logoutAll as apiLogoutAll,
} from '@/api/auth';
import { useAuthStore } from '@/store/authStore';

export function useAuth() {
  const router = useRouter();
  const {
    user,
    accessToken,
    refreshToken,
    isAuthenticated,
    setAuth,
    clearAuth,
  } = useAuthStore();

  const loginAction = async (email: string, password: string) => {
    const response = await login({ email, password });
    setAuth({
      accessToken: response.accessToken,
      refreshToken: response.refreshToken,
      user: response.user,
    });
    await router.navigate({ to: '/chat' });
    return response;
  };

  const registerAction = async (
    username: string,
    email: string,
    password: string
  ) => {
    const response = await register({ username, email, password });
    setAuth({
      accessToken: response.accessToken,
      refreshToken: response.refreshToken,
      user: response.user,
    });
    await router.navigate({ to: '/chat' });
    return response;
  };

  const logoutAction = async () => {
    try {
      if (refreshToken) {
        await apiLogout(refreshToken);
      }
    } finally {
      clearAuth();
      await router.navigate({ to: '/auth/login' });
    }
  };

  const logoutAllAction = async () => {
    try {
      await apiLogoutAll();
    } finally {
      clearAuth();
      await router.navigate({ to: '/auth/login' });
    }
  };

  return {
    user,
    accessToken,
    refreshToken,
    isAuthenticated,
    login: loginAction,
    register: registerAction,
    logout: logoutAction,
    logoutAll: logoutAllAction,
  };
}
