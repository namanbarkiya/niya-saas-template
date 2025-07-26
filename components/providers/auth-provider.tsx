"use client";

import React, { createContext, useContext, useEffect } from "react";
import { useUserStore, User } from "@/lib/store/user-store";
import { useCurrentUser, useCurrentSession } from "@/lib/query/hooks/auth";

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
    const { setUser, setSession, setLoading, isAuthenticated } = useUserStore();

    const { data: user, isLoading: userLoading } = useCurrentUser();
    const { data: session, isLoading: sessionLoading } = useCurrentSession();

    const isLoading = userLoading || sessionLoading;

    useEffect(() => {
        if (user && user.email) {
            setUser({
                id: user.id,
                email: user.email as string,
                name: user.user_metadata?.name,
                avatar_url: user.user_metadata?.avatar_url,
                created_at: user.created_at,
                updated_at: user.updated_at || user.created_at,
            });
        } else if (user) {
            // If user exists but no email, clear the user
            setUser(null);
        }
    }, [user, setUser]);

    useEffect(() => {
        if (session) {
            setSession(session);
        }
    }, [session, setSession]);

    useEffect(() => {
        setLoading(isLoading);
    }, [isLoading, setLoading]);

    const value: AuthContextType = {
        isAuthenticated,
        isLoading,
        user: null, // We'll handle user conversion in useEffect
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};
