"use client";

import Link from "next/link";
import { Mail, Settings, Users } from "lucide-react";
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
import type { UserProfile } from "@/lib/types/database";
import { calculateProfileCompletion } from "@/lib/utils/profile-utils";

interface ProfileOverviewProps {
  user: { name?: string; email?: string; avatar_url?: string } | null;
  profile: UserProfile | null;
  showEditButton?: boolean;
}

export function ProfileOverview({
  user,
  profile,
  showEditButton = true,
}: ProfileOverviewProps) {
  const displayName =
    profile?.display_name || profile?.full_name || user?.name || "Anonymous";
  const avatarUrl = profile?.avatar_url || user?.avatar_url;
  const profileCompletion = profile
    ? calculateProfileCompletion(profile)
    : null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Profile Overview
        </CardTitle>
        <CardDescription>
          Your account information and completion status
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Profile Info */}
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={avatarUrl} alt={displayName} />
            <AvatarFallback className="text-lg">
              {displayName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-2">
            <div>
              <h3 className="font-semibold">{displayName}</h3>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Mail className="h-3 w-3" />
                {user?.email}
              </p>
            </div>
            {profile?.company && (
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Users className="h-3 w-3" />
                {profile.company}
                {profile.job_title && ` • ${profile.job_title}`}
              </p>
            )}
            <div className="flex items-center gap-2">
              <Badge variant={profile?.is_public ? "default" : "secondary"}>
                {profile?.is_public ? "Public Profile" : "Private Profile"}
              </Badge>
              {profileCompletion?.isComplete && (
                <Badge variant="outline" className="text-green-600">
                  Complete
                </Badge>
              )}
            </div>
          </div>
        </div>

        <Separator />

        {/* Profile Completion Progress */}
        {profileCompletion && !profileCompletion.isComplete && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Profile Completion</span>
              <span className="text-sm text-muted-foreground">
                {profileCompletion.completionPercentage}% complete
              </span>
            </div>
            <Progress
              value={profileCompletion.completionPercentage}
              className="h-2"
            />
            <p className="text-xs text-muted-foreground">
              {profileCompletion.missingFields.length} fields remaining
            </p>
          </div>
        )}

        {/* Account Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm font-medium">Member Since</p>
            <p className="text-sm text-muted-foreground">
              {profile?.created_at
                ? new Date(profile.created_at).toLocaleDateString()
                : "Unknown"}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">Last Updated</p>
            <p className="text-sm text-muted-foreground">
              {profile?.updated_at
                ? new Date(profile.updated_at).toLocaleDateString()
                : "Unknown"}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        {showEditButton && (
          <div className="flex gap-2">
            <Link href="/dashboard/account">
              <Button>
                <Settings className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            </Link>
            {profileCompletion && !profileCompletion.isComplete && (
              <Link href="/dashboard/account">
                <Button variant="outline">Complete Profile</Button>
              </Link>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
