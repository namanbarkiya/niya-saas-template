/**
 * Users API — wraps all /api/v1/users/* endpoints.
 */
import { api } from "./client";
import type {
  ChangePasswordPayload,
  MeResponse,
  UpdateProfilePayload,
} from "./types";

export const usersApi = {
  me: () => api.get<MeResponse>("/users/me"),

  updateProfile: (payload: UpdateProfilePayload) =>
    api.put<MeResponse>("/users/me", payload),

  changePassword: (payload: ChangePasswordPayload) =>
    api.put<{ status: string; message: string }>("/users/me/password", payload),
};
