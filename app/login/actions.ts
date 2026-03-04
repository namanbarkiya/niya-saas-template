"use server";

/**
 * Server actions for login/signup forms.
 *
 * These are thin wrappers — the actual auth logic lives in the FastAPI backend.
 * The client-side hooks (useLogin / useSignup) handle the happy path with
 * toasts and redirects. These server actions are kept as a fallback for
 * progressive enhancement (non-JS environments).
 */
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

const API_BASE =
  (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000") + "/api/v1";

export async function login(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const res = await fetch(`${API_BASE}/auth/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    redirect("/error");
  }

  // Forward the Set-Cookie headers from the backend to the browser
  const setCookie = res.headers.get("set-cookie");
  if (setCookie) {
    const cookieStore = await cookies();
    // Next.js doesn't expose a simple way to forward raw Set-Cookie headers
    // from server actions; rely on the client-side hooks for full cookie support.
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

export async function signup(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string | null;

  const res = await fetch(`${API_BASE}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, name }),
  });

  if (!res.ok) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/login");
}
