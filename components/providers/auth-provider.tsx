"use client";

import React, { createContext, useContext, useEffect } from "react";
import { useUserStore } from "@/lib/store/user-store";
import { useCurrentUser, useCurrentSession } from "@/lib/query/hooks/auth";

interface AuthContextType {
    isAuthenticated: boolean;
    isLoading: boolean;
    user: any;
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
        if (user) {
            setUser(user);
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
        user,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};
