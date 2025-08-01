"use client";

import Link from "next/link";
import {
  Bell,
  Calendar,
  FileText,
  Mail,
  Settings,
  Shield,
  User,
  Users,
  Zap,
} from "lucide-react";
import { ProfileCompletion } from "@/components/dashboard/profile";
import { useAuth } from "@/components/providers/auth-provider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useMyProfile } from "@/lib/query/hooks/profile";

export default function DashboardPage() {
  const { user, isLoading } = useAuth();
  const { data: profile, isLoading: profileLoading } = useMyProfile();

  if (isLoading || profileLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="text-sm text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const displayName =
    profile?.display_name || profile?.full_name || user?.name || "Anonymous";
  const avatarUrl = profile?.avatar_url || user?.avatar_url;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here&apos;s what&apos;s happening with your account.
        </p>
      </div>

      {/* Profile Completion */}
      <div className="mb-6">
        <ProfileCompletion />
      </div>

      {/* Main Content Grid */}
      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* User Profile Card */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Information
            </CardTitle>
            <CardDescription>
              Your account details and preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={avatarUrl} alt={displayName} />
                <AvatarFallback>
                  {displayName.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{displayName}</p>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{user?.email}</span>
            </div>
            {profile?.company && (
              <div className="flex items-center gap-3">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{profile.company}</span>
              </div>
            )}
            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">
                Member since{" "}
                {profile?.created_at
                  ? new Date(profile.created_at).toLocaleDateString()
                  : "Unknown"}
              </span>
            </div>
            <div className="pt-2">
              <Link href="/dashboard/account">
                <Button variant="outline" size="sm" className="w-full">
                  Edit Profile
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Quick Links Card */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Quick Actions
            </CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/dashboard/account">
              <Button
                variant="outline"
                className="w-full justify-start h-10 mb-3"
              >
                <Settings className="mr-2 h-4 w-4" />
                Account Settings
              </Button>
            </Link>
            <Link href="/dashboard/docs">
              <Button variant="outline" className="w-full justify-start h-10">
                <Settings className="mr-2 h-4 w-4" />
                Documentation
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Stats Card */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Profile Stats
            </CardTitle>
            <CardDescription>
              Your profile completion and activity
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Profile Status
              </span>
              <span className="text-sm font-medium">
                {profile?.profile_completed_at ? "Complete" : "Incomplete"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Visibility</span>
              <span className="text-sm font-medium">
                {profile?.is_public ? "Public" : "Private"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Last Active</span>
              <span className="text-sm font-medium">
                {profile?.last_seen_at
                  ? new Date(profile.last_seen_at).toLocaleDateString()
                  : "Unknown"}
              </span>
            </div>
            <div className="pt-2">
              <Button variant="outline" size="sm" className="w-full">
                View Details
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Additional Sections */}
      <section className="mt-8 grid gap-6 md:grid-cols-2">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>Your recent account activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span className="text-sm">Profile updated</span>
                <span className="text-xs text-muted-foreground ml-auto">
                  Today
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                <span className="text-sm">Login successful</span>
                <span className="text-xs text-muted-foreground ml-auto">
                  Today
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Quick Stats
            </CardTitle>
            <CardDescription>Overview of your account</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">1</div>
                <div className="text-xs text-muted-foreground">
                  Active Sessions
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">0</div>
                <div className="text-xs text-muted-foreground">
                  Notifications
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
