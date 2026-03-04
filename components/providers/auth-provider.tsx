"use client";

import React, { createContext, useContext, useEffect } from "react";
import { useCurrentUser } from "@/lib/query/hooks/auth";
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
  const { setUser, setLoading, isAuthenticated, user: storeUser } = useUserStore();

  const { data: meData, isLoading } = useCurrentUser();

  useEffect(() => {
    if (meData?.user) {
      const { user, profile } = meData;
      setUser({
        id: user.id,
        email: user.email,
        name: profile?.full_name ?? undefined,
        avatar_url: profile?.avatar_url ?? undefined,
        created_at: user.created_at,
        updated_at: user.updated_at,
      });
    } else if (!isLoading) {
      setUser(null);
    }
  }, [meData, isLoading, setUser]);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isLoading, user: storeUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
