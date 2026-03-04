/**
 * Server-side profile utilities.
 * Calls the FastAPI backend directly (server → server, no browser cookies).
 * Requires Authorization header with a valid access token.
 */
import type { UpdateUserProfileInput, UserProfile } from "@/lib/types/database";

const API_BASE =
  (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000") + "/api/v1";

async function serverFetch<T>(
  path: string,
  token: string,
  options: RequestInit = {}
): Promise<T | null> {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...(options.headers ?? {}),
      },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function getServerUserProfile(
  _userId: string,
  accessToken: string
): Promise<UserProfile | null> {
  const data = await serverFetch<{ user: unknown; profile: UserProfile | null }>(
    "/users/me",
    accessToken
  );
  return data?.profile ?? null;
}

export async function updateServerUserProfile(
  _userId: string,
  updates: UpdateUserProfileInput,
  accessToken: string
): Promise<UserProfile | null> {
  const data = await serverFetch<{ user: unknown; profile: UserProfile | null }>(
    "/users/me",
    accessToken,
    { method: "PUT", body: JSON.stringify(updates) }
  );
  return data?.profile ?? null;
}

/** Admin-level listing is not exposed by this API — returns empty array. */
export async function getAllUserProfiles(): Promise<UserProfile[]> {
  return [];
}

/** Admin-level delete is not exposed by this API — returns false. */
export async function deleteUserProfile(_userId: string): Promise<boolean> {
  return false;
}
