import { persist } from "zustand/middleware";
import { create } from "zustand";
import type { UserProfile } from "@/lib/types/database";

export interface User {
  id: string;
  email: string;
  name?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface AuthState {
  user: User | null;
  profile: UserProfile | null;
  session: unknown | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface UserPreferences {
  theme: "light" | "dark" | "system";
  language: string;
  notifications: boolean;
  email_notifications: boolean;
  push_notifications: boolean;
  marketing_emails: boolean;
}

export interface UserStore extends AuthState {
  preferences: UserPreferences;

  // Actions
  setUser: (user: User | null) => void;
  setProfile: (profile: UserProfile | null) => void;
  setSession: (session: unknown | null) => void;
  setLoading: (loading: boolean) => void;
  setAuthenticated: (authenticated: boolean) => void;
  setPreferences: (preferences: Partial<UserPreferences>) => void;
  logout: () => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  updateUser: (updates: Partial<User>) => void;
}

const defaultPreferences: UserPreferences = {
  theme: "system",
  language: "en",
  notifications: true,
  email_notifications: true,
  push_notifications: true,
  marketing_emails: false,
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      // Initial state
      user: null,
      profile: null,
      session: null,
      isLoading: false,
      isAuthenticated: false,
      preferences: defaultPreferences,

      // Actions
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setProfile: (profile) => set({ profile }),
      setSession: (session) => set({ session }),
      setLoading: (isLoading) => set({ isLoading }),
      setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
      setPreferences: (preferences) =>
        set((state) => ({
          preferences: { ...state.preferences, ...preferences },
        })),
      logout: () =>
        set({
          user: null,
          profile: null,
          session: null,
          isAuthenticated: false,
          isLoading: false,
        }),
      updateProfile: (updates) =>
        set((state) => ({
          profile: state.profile ? { ...state.profile, ...updates } : null,
        })),
      updateUser: (updates) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        })),
    }),
    {
      name: "user-store",
      partialize: (state) => ({
        user: state.user,
        profile: state.profile,
        session: state.session,
        isAuthenticated: state.isAuthenticated,
        preferences: state.preferences,
      }),
    }
  )
);
