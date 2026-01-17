import { create } from 'zustand';
import type { User } from '@/types/auth';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (auth: { token: string; user: User | null }) => void;
  setUser: (user: User | null) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  setAuth: (auth) =>
    set({
      token: auth.token,
      user: auth.user,
      isAuthenticated: !!auth.token,
    }),
  setUser: (user) => set({ user }),
  clearAuth: () =>
    set({
      user: null,
      token: null,
      isAuthenticated: false,
    }),
}));
