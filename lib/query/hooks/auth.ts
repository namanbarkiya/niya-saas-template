import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authApi } from "@/lib/api/auth";
import { usersApi } from "@/lib/api/users";
import { ApiRequestError } from "@/lib/api/client";
import { useNotifications } from "@/lib/hooks/use-notifications";
import { useUserStore } from "@/lib/store/user-store";
import { ErrorHandler } from "@/lib/utils/error-handler";
import { queryKeys } from "../client";
import type { MeResponse } from "@/lib/api/types";

// ---------------------------------------------------------------------------
// Get current user (calls /users/me)
// ---------------------------------------------------------------------------
export const useCurrentUser = () => {
  return useQuery({
    queryKey: queryKeys.auth.user,
    queryFn: async (): Promise<MeResponse | null> => {
      try {
        return await usersApi.me();
      } catch (err) {
        if (err instanceof ApiRequestError && err.status === 401) return null;
        throw err;
      }
    },
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
};

/**
 * useCurrentSession — compatibility alias.
 * Returns whether a valid session exists. The real session is managed via
 * HttpOnly cookies; this hook simply wraps useCurrentUser for UI purposes.
 */
export const useCurrentSession = () => {
  return useQuery({
    queryKey: queryKeys.auth.session,
    queryFn: async () => {
      try {
        const data = await usersApi.me();
        return data ? { user: data.user } : null;
      } catch {
        return null;
      }
    },
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
};

// ---------------------------------------------------------------------------
// Login
// ---------------------------------------------------------------------------
export const useLogin = () => {
  const queryClient = useQueryClient();
  const { setUser, setLoading } = useUserStore();
  const { success } = useNotifications();
  const router = useRouter();

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      authApi.signIn({ email, password }),
    onMutate: () => setLoading(true),
    onSuccess: (data) => {
      setUser({
        id: data.user.id,
        email: data.user.email,
        name: data.profile?.full_name ?? undefined,
        avatar_url: data.profile?.avatar_url ?? undefined,
        created_at: data.user.created_at,
        updated_at: data.user.updated_at,
      });
      setLoading(false);
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.user });
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.session });
      success("Login Successful", "Welcome back!");
      router.push("/dashboard");
    },
    onError: (error: unknown) => {
      setLoading(false);
      ErrorHandler.handle(error, "login");
    },
  });
};

// ---------------------------------------------------------------------------
// Signup
// ---------------------------------------------------------------------------
export const useSignup = () => {
  const { setLoading } = useUserStore();
  const { success } = useNotifications();
  const router = useRouter();

  return useMutation({
    mutationFn: ({
      email,
      password,
      name,
    }: {
      email: string;
      password: string;
      name: string;
    }) => authApi.signUp({ email, password, name }),
    onMutate: () => setLoading(true),
    onSuccess: (_data, variables) => {
      setLoading(false);
      success("Account Created", "Enter the 6-digit code sent to your email.");
      router.push(
        `/verify-otp?email=${encodeURIComponent(variables.email)}`
      );
    },
    onError: (error: unknown) => {
      setLoading(false);
      ErrorHandler.handle(error, "signup");
    },
  });
};

// ---------------------------------------------------------------------------
// Logout
// ---------------------------------------------------------------------------
export const useLogout = () => {
  const queryClient = useQueryClient();
  const { logout } = useUserStore();
  const { success } = useNotifications();
  const router = useRouter();

  return useMutation({
    mutationFn: () => authApi.signOut(),
    onSuccess: () => {
      logout();
      queryClient.clear();
      success("Logged Out", "You have been successfully logged out.");
      router.push("/login");
    },
    onError: (error: unknown) => {
      ErrorHandler.handle(error, "logout");
    },
  });
};

// ---------------------------------------------------------------------------
// Verify OTP
// ---------------------------------------------------------------------------
export const useVerifyOtp = () => {
  const { success } = useNotifications();
  const router = useRouter();

  return useMutation({
    mutationFn: ({ email, otp }: { email: string; otp: string }) =>
      authApi.verifyOtp(email, otp),
    onSuccess: () => {
      success("Email Verified", "Your account is ready. Please sign in.");
      router.push("/login?verified=1");
    },
    onError: (error: unknown) => {
      ErrorHandler.handle(error, "verify OTP");
    },
  });
};

// ---------------------------------------------------------------------------
// Resend OTP
// ---------------------------------------------------------------------------
export const useResendOtp = () => {
  const { success } = useNotifications();

  return useMutation({
    mutationFn: (email: string) => authApi.resendOtp(email),
    onSuccess: () => {
      success("Code Sent", "A new verification code has been sent.");
    },
    onError: (error: unknown) => {
      ErrorHandler.handle(error, "resend OTP");
    },
  });
};

// ---------------------------------------------------------------------------
// Forgot password
// ---------------------------------------------------------------------------
export const useForgotPassword = () => {
  const { success } = useNotifications();

  return useMutation({
    mutationFn: (email: string) => authApi.forgotPassword(email),
    onSuccess: () => {
      success(
        "Email Sent",
        "If this email is registered, you will receive reset instructions."
      );
    },
    onError: (error: unknown) => {
      ErrorHandler.handle(error, "forgot password");
    },
  });
};

// ---------------------------------------------------------------------------
// Reset password
// ---------------------------------------------------------------------------
export const useResetPassword = () => {
  const { success } = useNotifications();
  const router = useRouter();

  return useMutation({
    mutationFn: ({
      token,
      new_password,
    }: {
      token: string;
      new_password: string;
    }) => authApi.resetPassword(token, new_password),
    onSuccess: () => {
      success("Password Updated", "Please sign in with your new password.");
      router.push("/login");
    },
    onError: (error: unknown) => {
      ErrorHandler.handle(error, "reset password");
    },
  });
};
