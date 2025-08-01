"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  ProfileAccountStatus,
  ProfileDangerZone,
  ProfileForm,
} from "@/components/dashboard/profile";
import { useAuth } from "@/components/providers/auth-provider";
import { useLogout, useMyProfile } from "@/lib/query/hooks";
import type { UpdateUserProfileInput } from "@/lib/types/database";

export default function AccountPage() {
  const { user, isLoading } = useAuth();
  const { data: profile, isLoading: profileLoading } = useMyProfile();
  const logoutMutation = useLogout();
  const router = useRouter();
  const [formData, setFormData] = useState<UpdateUserProfileInput>({
    full_name: "",
    display_name: "",
    first_name: "",
    last_name: "",
    phone: "",
    country: "",
    timezone: "UTC",
    locale: "en",
    bio: "",
    website: "",
    twitter_url: "",
    linkedin_url: "",
    github_url: "",
    company: "",
    job_title: "",
    industry: "",
    is_public: false,
    email_notifications: true,
    push_notifications: true,
    marketing_emails: false,
  });

  // Initialize form data when profile loads
  useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || "",
        display_name: profile.display_name || "",
        first_name: profile.first_name || "",
        last_name: profile.last_name || "",
        phone: profile.phone || "",
        country: profile.country || "",
        timezone: profile.timezone || "UTC",
        locale: profile.locale || "en",
        bio: profile.bio || "",
        website: profile.website || "",
        twitter_url: profile.twitter_url || "",
        linkedin_url: profile.linkedin_url || "",
        github_url: profile.github_url || "",
        company: profile.company || "",
        job_title: profile.job_title || "",
        industry: profile.industry || "",
        is_public: profile.is_public || false,
        email_notifications: profile.email_notifications ?? true,
        push_notifications: profile.push_notifications ?? true,
        marketing_emails: profile.marketing_emails ?? false,
      });
    }
  }, [profile]);

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to logout");
    }
  };

  if (isLoading || profileLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="text-sm text-muted-foreground">Loading account...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Account Settings</h1>
        <p className="text-muted-foreground">
          Manage your account information and preferences
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Profile Section */}
        <div className="lg:col-span-2">
          <ProfileForm
            profile={profile}
            user={user}
            formData={formData}
            setFormData={setFormData}
          />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <ProfileAccountStatus profile={profile} />
          <ProfileDangerZone
            onLogout={handleLogout}
            isLoggingOut={logoutMutation.isPending}
          />
        </div>
      </div>
    </div>
  );
}
