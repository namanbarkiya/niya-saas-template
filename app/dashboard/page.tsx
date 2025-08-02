"use client";

import Link from "next/link";
import {
  Activity,
  AlertCircle,
  Bell,
  Calendar,
  CheckCircle,
  Clock,
  FileText,
  Mail,
  Settings,
  Shield,
  TrendingUp,
  User,
  Users,
  Zap,
} from "lucide-react";
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
import { useMyProfile } from "@/lib/query/hooks/profile";
import { calculateProfileCompletion } from "@/lib/utils/profile-utils";

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
  const profileCompletion = profile
    ? calculateProfileCompletion(profile)
    : null;

  // Custom activities for dashboard
  const dashboardActivities = [
    {
      id: "1",
      title: "Profile updated",
      description: "Your profile information was updated",
      timestamp: "Today",
      type: "success" as const,
    },
    {
      id: "2",
      title: "Login successful",
      description: "You successfully logged into your account",
      timestamp: "Today",
      type: "info" as const,
    },
    {
      id: "3",
      title: "Account created",
      description: "Your account was successfully created",
      timestamp: profile?.created_at
        ? new Date(profile.created_at).toLocaleDateString()
        : "Unknown",
      type: "info" as const,
    },
  ];

  return (
    <div className="space-y-8 p-6">
      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Profile Completion
            </CardTitle>
            {profileCompletion?.isComplete ? (
              <CheckCircle className="h-4 w-4 text-green-600" />
            ) : (
              <AlertCircle className="h-4 w-4 text-orange-600" />
            )}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {profileCompletion?.completionPercentage || 0}%
            </div>
            <p className="text-xs text-muted-foreground">
              {profileCompletion?.isComplete ? "Complete" : "Incomplete"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Account Status
            </CardTitle>
            <Shield className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Active</div>
            <p className="text-xs text-muted-foreground">
              Member since{" "}
              {profile?.created_at
                ? new Date(profile.created_at).toLocaleDateString()
                : "Unknown"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last Activity</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Today</div>
            <p className="text-xs text-muted-foreground">
              {profile?.last_seen_at
                ? new Date(profile.last_seen_at).toLocaleDateString()
                : "Unknown"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Profile Visibility
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {profile?.is_public ? "Public" : "Private"}
            </div>
            <p className="text-xs text-muted-foreground">
              {profile?.is_public ? "Visible to everyone" : "Only you can see"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Overview */}
        <div className="lg:col-span-2">
          <ProfileOverview user={user} profile={profile || null} />
        </div>

        {/* Quick Actions */}
        <QuickActions />
      </div>

      {/* Recent Activity */}
      <RecentActivity activities={dashboardActivities} />
    </div>
  );
}
