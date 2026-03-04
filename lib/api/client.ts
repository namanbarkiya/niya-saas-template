/**
 * Base API client — thin fetch wrapper that:
 *  - Prepends NEXT_PUBLIC_API_URL to every request
 *  - Sends credentials (cookies) automatically
 *  - Throws ApiError on non-2xx responses
 *  - Handles token refresh transparently (one retry)
 */

import type { ApiError } from "./types";

const API_BASE =
  (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000") + "/api/v1";

export class ApiRequestError extends Error {
  status: number;
  body: ApiError;

  constructor(status: number, body: ApiError) {
    super(body.message ?? "API request failed");
    this.status = status;
    this.body = body;
  }
}

async function parseError(res: Response): Promise<ApiError> {
  try {
    return (await res.json()) as ApiError;
  } catch {
    return { status: "error", message: res.statusText || "Unknown error" };
  }
}

type FetchOptions = Omit<RequestInit, "body"> & { body?: unknown };

let _refreshing: Promise<void> | null = null;

async function _refreshTokens(): Promise<void> {
  const res = await fetch(`${API_BASE}/auth/refresh`, {
    method: "POST",
    credentials: "include",
  });
  if (!res.ok) {
    throw new ApiRequestError(res.status, await parseError(res));
  }
}

export async function apiFetch<T>(
  path: string,
  options: FetchOptions = {},
  _retried = false
): Promise<T> {
  const { body, ...rest } = options;

  const res = await fetch(`${API_BASE}${path}`, {
    ...rest,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(rest.headers ?? {}),
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  // Transparent token refresh on 401 (only once)
  if (res.status === 401 && !_retried) {
    try {
      if (!_refreshing) {
        _refreshing = _refreshTokens().finally(() => {
          _refreshing = null;
        });
      }
      await _refreshing;
      return apiFetch<T>(path, options, true);
    } catch {
      throw new ApiRequestError(401, {
        status: "error",
        message: "Session expired. Please sign in again.",
      });
    }
  }

  if (!res.ok) {
    throw new ApiRequestError(res.status, await parseError(res));
  }

  // 204 No Content
  if (res.status === 204) {
    return undefined as unknown as T;
  }

  return res.json() as Promise<T>;
}

/** Convenience methods */
export const api = {
  get: <T>(path: string, init?: FetchOptions) =>
    apiFetch<T>(path, { method: "GET", ...init }),

  post: <T>(path: string, body?: unknown, init?: FetchOptions) =>
    apiFetch<T>(path, { method: "POST", body, ...init }),

  put: <T>(path: string, body?: unknown, init?: FetchOptions) =>
    apiFetch<T>(path, { method: "PUT", body, ...init }),

  patch: <T>(path: string, body?: unknown, init?: FetchOptions) =>
    apiFetch<T>(path, { method: "PATCH", body, ...init }),

  delete: <T>(path: string, init?: FetchOptions) =>
    apiFetch<T>(path, { method: "DELETE", ...init }),
};
