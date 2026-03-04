import { Suspense } from "react";
import Link from "next/link";
import { GalleryVerticalEnd } from "lucide-react";
import { VerifyOtpContent } from "./verify-otp-content";

export default function VerifyOtpPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      {/* Left panel */}
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Niya.
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <Suspense fallback={<div className="text-center text-muted-foreground text-sm">Loading…</div>}>
              <VerifyOtpContent />
            </Suspense>
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="relative hidden bg-muted lg:block">
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-primary/5 to-primary/20 p-12 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
            <svg className="size-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold">Secure verification</h2>
          <p className="text-muted-foreground max-w-xs">
            We verify your email to keep your account safe. Check your inbox for the 6-digit code.
          </p>
        </div>
      </div>
    </div>
  );
}
