import { NextRequest, NextResponse } from "next/server";

const API_BASE =
  (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000") + "/api/v1";

/**
 * GET /api/auth/confirm?token=xxx
 *
 * Proxies email confirmation to the FastAPI backend then redirects to login.
 */
export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(new URL("/error?reason=missing_token", request.url));
  }

  try {
    const res = await fetch(
      `${API_BASE}/auth/confirm-email?token=${encodeURIComponent(token)}`,
      { method: "GET" }
    );

    if (!res.ok) {
      return NextResponse.redirect(new URL("/error?reason=invalid_token", request.url));
    }

    return NextResponse.redirect(new URL("/login?verified=1", request.url));
  } catch {
    return NextResponse.redirect(new URL("/error?reason=server_error", request.url));
  }
}
