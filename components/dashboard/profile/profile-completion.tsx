"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle, Circle, Edit, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useMyProfile } from "@/lib/query/hooks/profile";
import { calculateProfileCompletion } from "@/lib/utils/profile-utils";

export function ProfileCompletion() {
  const { data: profile, isLoading } = useMyProfile();
  const [isExpanded, setIsExpanded] = useState(false);

  if (isLoading || !profile) {
    return null;
  }

  const completion = calculateProfileCompletion(profile);

  if (completion.isComplete) {
    return (
      <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-300">
            <CheckCircle className="h-5 w-5" />
            Profile Complete
          </CardTitle>
          <CardDescription className="text-green-600 dark:text-green-400">
            Your profile is fully set up and ready to go!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <span className="text-sm text-green-600 dark:text-green-400">
              All required fields completed
            </span>
            <Link href="/dashboard/account">
              <Button variant="outline" size="sm">
                <Edit className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950/20">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-orange-700 dark:text-orange-300">
          <User className="h-5 w-5" />
          Complete Your Profile
        </CardTitle>
        <CardDescription className="text-orange-600 dark:text-orange-400">
          {completion.completionPercentage}% complete - Add more information to
          get the most out of your account
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-orange-600 dark:text-orange-400">
              Progress
            </span>
            <span className="font-medium text-orange-700 dark:text-orange-300">
              {completion.completionPercentage}%
            </span>
          </div>
          <Progress value={completion.completionPercentage} className="h-2" />
        </div>

        {isExpanded && completion.missingFields.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-orange-700 dark:text-orange-300">
              Missing fields:
            </p>
            <ul className="space-y-1">
              {completion.missingFields.slice(0, 5).map((field) => (
                <li
                  key={field}
                  className="flex items-center gap-2 text-sm text-orange-600 dark:text-orange-400"
                >
                  <Circle className="h-3 w-3" />
                  {field
                    .replace(/_/g, " ")
                    .replace(/\b\w/g, (l) => l.toUpperCase())}
                </li>
              ))}
              {completion.missingFields.length > 5 && (
                <li className="text-xs text-orange-500 dark:text-orange-500">
                  +{completion.missingFields.length - 5} more fields
                </li>
              )}
            </ul>
          </div>
        )}

        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300"
          >
            {isExpanded ? "Show less" : "Show details"}
          </Button>
          <Link href="/dashboard/account">
            <Button
              size="sm"
              className="bg-orange-600 hover:bg-orange-700 dark:bg-orange-600 dark:hover:bg-orange-700"
            >
              <Edit className="mr-2 h-4 w-4" />
              Complete Profile
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
