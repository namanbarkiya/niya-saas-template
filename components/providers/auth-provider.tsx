"use client";

import React, { createContext, useContext, useEffect } from "react";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { useCurrentSession, useCurrentUser } from "@/lib/query/hooks/auth";
import { User, useUserStore } from "@/lib/store/user-store";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const {
    setUser,
    setSession,
    setLoading,
    isAuthenticated,
    user: storeUser,
  } = useUserStore();

  const { data: supabaseUser, isLoading: userLoading } = useCurrentUser();
  const { data: session, isLoading: sessionLoading } = useCurrentSession();

  const isLoading = userLoading || sessionLoading;

  useEffect(() => {
    if (supabaseUser && supabaseUser.email) {
      const user = supabaseUser as SupabaseUser;
      setUser({
        id: user.id,
        email: user.email as string,
        name: user.user_metadata?.name,
        avatar_url: user.user_metadata?.avatar_url,
        created_at: user.created_at,
        updated_at: user.updated_at || user.created_at,
      });
    } else {
      // Clear user when supabaseUser is null or doesn't have email
      setUser(null);
    }
  }, [supabaseUser, setUser]);

  useEffect(() => {
    if (session) {
      setSession(session);
    } else {
      // Clear session when session is null
      setSession(null);
    }
  }, [session, setSession]);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  const value: AuthContextType = {
    isAuthenticated,
    isLoading,
    user: storeUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
