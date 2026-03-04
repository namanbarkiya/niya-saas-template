"use client";

import { useState, useEffect, useCallback } from "react";
import { MailCheck, RotateCcw, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { OtpInput } from "./otp-input";
import { Button } from "@/components/ui/button";
import { useVerifyOtp, useResendOtp } from "@/lib/query/hooks/auth";

const RESEND_COOLDOWN = 60; // seconds

interface OtpFormProps {
  email: string;
}

export function OtpForm({ email }: OtpFormProps) {
  const [otp, setOtp] = useState("");
  const [countdown, setCountdown] = useState(RESEND_COOLDOWN);
  const [canResend, setCanResend] = useState(false);

  const verifyMutation = useVerifyOtp();
  const resendMutation = useResendOtp();

  // Countdown timer
  useEffect(() => {
    if (countdown <= 0) {
      setCanResend(true);
      return;
    }
    const id = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(id);
  }, [countdown]);

  const handleSubmit = useCallback(
    (code: string) => {
      if (code.length !== 6 || verifyMutation.isPending) return;
      verifyMutation.mutate({ email, otp: code });
    },
    [email, verifyMutation]
  );

  // Auto-submit when all 6 digits are entered
  useEffect(() => {
    if (otp.length === 6) handleSubmit(otp);
  }, [otp, handleSubmit]);

  const handleResend = () => {
    if (!canResend || resendMutation.isPending) return;
    resendMutation.mutate(email);
    setCountdown(RESEND_COOLDOWN);
    setCanResend(false);
    setOtp("");
  };

  const isPending = verifyMutation.isPending || resendMutation.isPending;

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      {/* Icon */}
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <MailCheck className="size-7" />
      </div>

      {/* Heading */}
      <div className="text-center space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Check your email</h1>
        <p className="text-sm text-muted-foreground">
          We sent a 6-digit code to
        </p>
        <p className="text-sm font-medium">{email}</p>
      </div>

      {/* OTP input */}
      <div className="w-full space-y-4">
        <OtpInput
          value={otp}
          onChange={setOtp}
          disabled={isPending}
          autoFocus
        />

        <Button
          className="w-full"
          onClick={() => handleSubmit(otp)}
          disabled={otp.length !== 6 || isPending}
        >
          {verifyMutation.isPending ? "Verifying…" : "Verify Email"}
        </Button>
      </div>

      {/* Resend */}
      <div className="text-center text-sm text-muted-foreground">
        {canResend ? (
          <button
            onClick={handleResend}
            disabled={resendMutation.isPending}
            className="inline-flex items-center gap-1.5 text-primary hover:underline underline-offset-4 disabled:opacity-50"
          >
            <RotateCcw className="size-3.5" />
            {resendMutation.isPending ? "Sending…" : "Resend code"}
          </button>
        ) : (
          <span>
            Resend code in{" "}
            <span className="tabular-nums font-medium text-foreground">
              {countdown}s
            </span>
          </span>
        )}
      </div>

      {/* Back link */}
      <Link
        href="/signup"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="size-3.5" />
        Back to sign up
      </Link>
    </div>
  );
}
