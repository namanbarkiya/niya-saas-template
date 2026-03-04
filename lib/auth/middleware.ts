/**
 * Auth middleware helper — reads the access_token cookie and calls the
 * backend /users/me to check if the session is still valid.
 *
 * Replaces the old lib/supabase/middleware.ts.
 */
import { NextRequest, NextResponse } from "next/server";

const API_BASE =
  (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000") + "/api/v1";

/** Public paths that do NOT require authentication. */
const PUBLIC_PATHS = ["/login", "/signup", "/auth", "/error", "/api/auth"];

function isPublicPath(pathname: string): boolean {
  return PUBLIC_PATHS.some((p) => pathname.startsWith(p));
}

/**
 * Verify the current session by calling the backend.
 * We forward the cookies so the backend can read the access_token cookie.
 * Returns true if the user is authenticated.
 */
async function verifySession(request: NextRequest): Promise<boolean> {
  const accessToken = request.cookies.get("access_token")?.value;
  if (!accessToken) return false;

  try {
    const res = await fetch(`${API_BASE}/users/me`, {
      method: "GET",
      headers: {
        Cookie: request.headers.get("cookie") ?? "",
        Authorization: `Bearer ${accessToken}`,
      },
      // Abort quickly to avoid holding up page loads
      signal: AbortSignal.timeout(3000),
    });

    if (res.ok) return true;

    // Try to refresh if 401
    if (res.status === 401) {
      const refreshToken = request.cookies.get("refresh_token")?.value;
      if (!refreshToken) return false;

      const refreshRes = await fetch(`${API_BASE}/auth/refresh`, {
        method: "POST",
        headers: { Cookie: request.headers.get("cookie") ?? "" },
        signal: AbortSignal.timeout(3000),
      });

      return refreshRes.ok;
    }

    return false;
  } catch {
    // Network error / timeout — don't block navigation; let the page handle it
    return false;
  }
}

export async function updateSession(request: NextRequest): Promise<NextResponse> {
  const { pathname } = request.nextUrl;

  // Always allow public paths through
  if (isPublicPath(pathname)) {
    return NextResponse.next({ request });
  }

  const authenticated = await verifySession(request);

  if (!authenticated) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next({ request });
}
