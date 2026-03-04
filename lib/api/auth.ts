/**
 * Auth API — wraps all /api/v1/auth/* endpoints.
 */
import { api } from "./client";
import type {
  AuthResponse,
  ChangePasswordPayload,
  SignInPayload,
  SignUpPayload,
} from "./types";

export const authApi = {
  signUp: (payload: SignUpPayload) =>
    api.post<{ status: string; message: string; user: AuthResponse["user"] }>(
      "/auth/signup",
      payload
    ),

  signIn: (payload: SignInPayload) =>
    api.post<AuthResponse>("/auth/signin", payload),

  signOut: () => api.post<{ status: string; message: string }>("/auth/signout"),

  refresh: () => api.post<AuthResponse>("/auth/refresh"),

  confirmEmail: (token: string) =>
    api.get<{ status: string; message: string }>(
      `/auth/confirm-email?token=${encodeURIComponent(token)}`
    ),

  forgotPassword: (email: string) =>
    api.post<{ status: string; message: string }>("/auth/forgot-password", {
      email,
    }),

  resetPassword: (token: string, new_password: string) =>
    api.post<{ status: string; message: string }>("/auth/reset-password", {
      token,
      new_password,
    }),
};
