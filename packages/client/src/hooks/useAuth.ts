import { useEffect } from 'react';
import { useRouter } from '@tanstack/react-router';
import { login, logout as apiLogout, signup } from '@/api/auth';
import { useAuthStore } from '@/store/authStore';

export function useAuth() {
  const router = useRouter();
  const { user, token, isAuthenticated, setAuth, clearAuth } = useAuthStore();

  useEffect(() => {
    // Check for stored token on mount
    const storedToken = localStorage.getItem('auth_token');
    if (storedToken && !token) {
      setAuth({ token: storedToken, user: null });
    }
  }, [token, setAuth]);

  const loginAction = async (email: string, password: string) => {
    const response = await login({ email, password });
    localStorage.setItem('auth_token', response.token);
    setAuth({ token: response.token, user: response.user });
    await router.navigate({ to: '/chat' });
    return response;
  };

  const signupAction = async (
    name: string,
    email: string,
    password: string
  ) => {
    const response = await signup({ name, email, password });
    localStorage.setItem('auth_token', response.token);
    setAuth({ token: response.token, user: response.user });
    await router.navigate({ to: '/chat' });
    return response;
  };

  const logout = async () => {
    try {
      await apiLogout();
    } finally {
      localStorage.removeItem('auth_token');
      clearAuth();
      await router.navigate({ to: '/auth/login' });
    }
  };

  return {
    user,
    token,
    isAuthenticated,
    login: loginAction,
    signup: signupAction,
    logout,
  };
}
