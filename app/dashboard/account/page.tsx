"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  Bell,
  Calendar,
  CheckCircle,
  Mail,
  Settings,
  Shield,
  Trash2,
  User,
  Users,
} from "lucide-react";
import { toast } from "sonner";
import {
  ProfileAccountStatus,
  ProfileDangerZone,
  ProfileTabs,
} from "@/components/dashboard/profile";
import { ProfileOverview } from "@/components/dashboard/profile/profile-overview";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { useAuth } from "@/components/providers/auth-provider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useLogout, useMyProfile, useUpdateMyProfile } from "@/lib/query/hooks";
import type { UpdateUserProfileInput, UserProfile } from "@/lib/types/database";
import { calculateProfileCompletion } from "@/lib/utils/profile-utils";
import { validateProfileData } from "@/lib/utils/profile-utils";

export default function AccountPage() {
  const { user, isLoading } = useAuth();
  const { data: profile, isLoading: profileLoading } = useMyProfile();
  const updateProfileMutation = useUpdateMyProfile();
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

  const handleSave = () => {
    // Client-side validation
    const validation = validateProfileData(formData);
    if (!validation.isValid) {
      toast.error(`Validation errors: ${validation.errors.join(", ")}`);
      return;
    }

    updateProfileMutation.mutate(formData, {
      onSuccess: () => {
        toast.success("Profile updated successfully!");
      },
      onError: (error) => {
        console.error("Error updating profile:", error);
        toast.error("Failed to update profile");
      },
    });
  };

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

  const displayName =
    profile?.display_name || profile?.full_name || user?.name || "Anonymous";
  const avatarUrl = profile?.avatar_url || user?.avatar_url;
  const profileCompletion = profile
    ? calculateProfileCompletion(profile)
    : null;

  // Custom actions for account page
  const accountActions = [
    {
      label: "Account Settings",
      href: "/dashboard/account",
      icon: Settings,
    },
    {
      label: "Notification Preferences",
      icon: Bell,
    },
    {
      label: "Privacy Settings",
      icon: Shield,
    },
  ];

  // Custom activities for account page
  const accountActivities = [
    {
      id: "1",
      title: "Profile updated",
      description: "Your profile information was updated",
      timestamp: "Today",
      type: "success" as const,
    },
    {
      id: "2",
      title: "Settings changed",
      description: "Your account settings were modified",
      timestamp: "Yesterday",
      type: "info" as const,
    },
    {
      id: "3",
      title: "Login successful",
      description: "You successfully logged into your account",
      timestamp: "Today",
      type: "info" as const,
    },
  ];

  return (
    <div className="space-y-6 p-6">
      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-4">
        {/* Main Content Area - 3 columns */}
        <div className="lg:col-span-3 space-y-6">
          {/* Profile Overview */}
          <ProfileOverview
            user={user}
            profile={profile || null}
            showEditButton={false}
          />

          {/* Profile Tabs */}
          <ProfileTabs
            profile={profile || null}
            user={user}
            formData={formData}
            setFormData={setFormData}
            onSave={handleSave}
            isSaving={updateProfileMutation.isPending}
          />
        </div>

        {/* Sidebar - 1 column */}
        <div className="space-y-6">
          {/* Account Status */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Activity className="h-4 w-4" />
                Account Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Profile Status</span>
                <Badge
                  variant={
                    profileCompletion?.isComplete ? "default" : "secondary"
                  }
                  className="text-xs"
                >
                  {profileCompletion?.isComplete ? "Complete" : "Incomplete"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Visibility</span>
                <Badge
                  variant={profile?.is_public ? "default" : "secondary"}
                  className="text-xs"
                >
                  {profile?.is_public ? "Public" : "Private"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Notifications</span>
                <Badge
                  variant={
                    profile?.email_notifications ? "default" : "secondary"
                  }
                  className="text-xs"
                >
                  {profile?.email_notifications ? "Enabled" : "Disabled"}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <QuickActions
            title="Quick Actions"
            actions={accountActions}
            compact={true}
          />

          {/* Recent Activity */}
          <RecentActivity activities={accountActivities} compact={true} />

          {/* Profile Components */}
          {/* <ProfileAccountStatus profile={profile || ({} as UserProfile)} /> */}
          <ProfileDangerZone
            onLogout={handleLogout}
            isLoggingOut={logoutMutation.isPending}
          />
        </div>
      </div>
    </div>
  );
}
