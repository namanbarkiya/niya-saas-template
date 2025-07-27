import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@/lib/hooks/use-notifications";
import { useUserStore } from "@/lib/store/user-store";
import { createClient } from "@/lib/supabase/client";
import { ErrorHandler } from "@/lib/utils/error-handler";
import { queryKeys } from "../client";

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
  const { success } = useNotifications();

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
      if (data.user && data.user.email) {
        setUser({
          id: data.user.id,
          email: data.user.email as string,
          name: data.user.user_metadata?.name,
          avatar_url: data.user.user_metadata?.avatar_url,
          created_at: data.user.created_at,
          updated_at: data.user.updated_at || data.user.created_at,
        });
      }
      setSession(data.session);
      setLoading(false);

      // Invalidate and refetch user data
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.user });
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.session });

      success("Login Successful", "Welcome back!");
    },
    onError: (error: unknown) => {
      setLoading(false);
      ErrorHandler.handle(error, "login");
    },
  });
};

// Hook for signup mutation
export const useSignup = () => {
  const { setLoading } = useUserStore();
  const { success } = useNotifications();

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
        success(
          "Account Created",
          "Please check your email to confirm your account."
        );
      } else {
        success(
          "Account Created",
          "Welcome! Your account has been created successfully."
        );
      }
    },
    onError: (error: unknown) => {
      setLoading(false);
      ErrorHandler.handle(error, "signup");
    },
  });
};

// Hook for logout mutation
export const useLogout = () => {
  const queryClient = useQueryClient();
  const { logout } = useUserStore();
  const { success } = useNotifications();

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

      success("Logged Out", "You have been successfully logged out.");
    },
    onError: (error: unknown) => {
      ErrorHandler.handle(error, "logout");
    },
  });
};
