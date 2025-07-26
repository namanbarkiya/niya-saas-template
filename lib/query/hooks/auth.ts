import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { queryKeys } from "../client";
import { useUserStore } from "@/lib/store/user-store";
import { useUIStore } from "@/lib/store/ui-store";

// Hook to get current user
export const useCurrentUser = () => {
    return useQuery({
        queryKey: queryKeys.auth.user,
        queryFn: async () => {
            const supabase = createClient();
            const {
                data: { user },
                error,
            } = await supabase.auth.getUser();

            if (error) {
                throw error;
            }

            return user;
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

// Hook to get current session
export const useCurrentSession = () => {
    return useQuery({
        queryKey: queryKeys.auth.session,
        queryFn: async () => {
            const supabase = createClient();
            const {
                data: { session },
                error,
            } = await supabase.auth.getSession();

            if (error) {
                throw error;
            }

            return session;
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

// Hook for login mutation
export const useLogin = () => {
    const queryClient = useQueryClient();
    const { setUser, setSession, setLoading } = useUserStore();
    const { addNotification } = useUIStore();

    return useMutation({
        mutationFn: async ({
            email,
            password,
        }: {
            email: string;
            password: string;
        }) => {
            const supabase = createClient();
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                throw error;
            }

            return data;
        },
        onMutate: () => {
            setLoading(true);
        },
        onSuccess: (data) => {
            setUser(data.user);
            setSession(data.session);
            setLoading(false);

            // Invalidate and refetch user data
            queryClient.invalidateQueries({ queryKey: queryKeys.auth.user });
            queryClient.invalidateQueries({ queryKey: queryKeys.auth.session });

            addNotification({
                type: "success",
                title: "Login Successful",
                message: "Welcome back!",
            });
        },
        onError: (error: any) => {
            setLoading(false);
            addNotification({
                type: "error",
                title: "Login Failed",
                message: error.message || "Failed to login. Please try again.",
            });
        },
    });
};

// Hook for signup mutation
export const useSignup = () => {
    const queryClient = useQueryClient();
    const { setLoading } = useUserStore();
    const { addNotification } = useUIStore();

    return useMutation({
        mutationFn: async ({
            email,
            password,
            name,
        }: {
            email: string;
            password: string;
            name: string;
        }) => {
            const supabase = createClient();
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        name,
                    },
                },
            });

            if (error) {
                throw error;
            }

            return data;
        },
        onMutate: () => {
            setLoading(true);
        },
        onSuccess: (data) => {
            setLoading(false);

            if (data.user && !data.session) {
                addNotification({
                    type: "success",
                    title: "Account Created",
                    message: "Please check your email to confirm your account.",
                });
            } else {
                addNotification({
                    type: "success",
                    title: "Account Created",
                    message:
                        "Welcome! Your account has been created successfully.",
                });
            }
        },
        onError: (error: any) => {
            setLoading(false);
            addNotification({
                type: "error",
                title: "Signup Failed",
                message:
                    error.message ||
                    "Failed to create account. Please try again.",
            });
        },
    });
};

// Hook for logout mutation
export const useLogout = () => {
    const queryClient = useQueryClient();
    const { logout } = useUserStore();
    const { addNotification } = useUIStore();

    return useMutation({
        mutationFn: async () => {
            const supabase = createClient();
            const { error } = await supabase.auth.signOut();

            if (error) {
                throw error;
            }
        },
        onSuccess: () => {
            logout();

            // Clear all queries
            queryClient.clear();

            addNotification({
                type: "success",
                title: "Logged Out",
                message: "You have been successfully logged out.",
            });
        },
        onError: (error: any) => {
            addNotification({
                type: "error",
                title: "Logout Failed",
                message: error.message || "Failed to logout. Please try again.",
            });
        },
    });
};
