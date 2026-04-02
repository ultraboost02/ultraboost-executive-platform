"use client";

import { create } from "zustand";
import type { User } from "@/types";

type AuthState = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isVerified: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  setUser: (user: User | null) => void;
  checkAuth: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isVerified: false,

  login: (token, user) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("token", token);
    }
    set({
      token,
      user,
      isAuthenticated: true,
      isVerified: Boolean(user?.is_verified),
    });
  },

  logout: () => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("token");
    }
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      isVerified: false,
    });
  },

  setUser: (user) =>
    set((state) => ({
      ...state,
      user,
      isVerified: Boolean(user?.is_verified),
      isAuthenticated: Boolean(state.token),
    })),

  checkAuth: () => {
    if (typeof window === "undefined") return;

    const token = window.localStorage.getItem("token");
    if (!token) {
      set({
        user: null,
        token: null,
        isAuthenticated: false,
        isVerified: false,
      });
      return;
    }

    set((state) => ({
      ...state,
      token,
      isAuthenticated: true,
      isVerified: Boolean(state.user?.is_verified),
    }));
  },
}));
