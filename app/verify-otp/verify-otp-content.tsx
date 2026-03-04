"use client";

import { useSearchParams } from "next/navigation";
import { redirect } from "next/navigation";
import { OtpForm } from "@/components/forms/otp-form";

export function VerifyOtpContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  if (!email) redirect("/signup");
  return <OtpForm email={decodeURIComponent(email)} />;
}
