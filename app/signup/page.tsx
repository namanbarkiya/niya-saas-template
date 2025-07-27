import Image from "next/image";
import Link from "next/link";
import { GalleryVerticalEnd } from "lucide-react";
import { AuthGuard } from "@/components/auth";
import { AuthForm } from "@/components/forms/auth-form";

export default function SignupPage() {
  return (
    <AuthGuard requireAuth={false} redirectTo="/dashboard">
      <div className="grid min-h-svh lg:grid-cols-2">
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
              <AuthForm mode="signup" />
            </div>
          </div>
        </div>
        <div className="relative hidden bg-muted lg:block">
          <Image
            src="https://images.pexels.com/photos/18069239/pexels-photo-18069239.png"
            alt="Image"
            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            width={1000}
            height={1000}
          />
        </div>
      </div>
    </AuthGuard>
  );
}
