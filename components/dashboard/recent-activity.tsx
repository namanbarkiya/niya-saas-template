"use client";

import { Activity } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ActivityItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: "success" | "info" | "warning" | "error";
}

interface RecentActivityProps {
  title?: string;
  description?: string;
  activities?: ActivityItem[];
  compact?: boolean;
}

const defaultActivities: ActivityItem[] = [
  {
    id: "1",
    title: "Profile updated",
    description: "Your profile information was updated",
    timestamp: "Today",
    type: "success",
  },
  {
    id: "2",
    title: "Login successful",
    description: "You successfully logged into your account",
    timestamp: "Today",
    type: "info",
  },
  {
    id: "3",
    title: "Account created",
    description: "Your account was successfully created",
    timestamp: "Unknown",
    type: "info",
  },
];

const getActivityColor = (type: ActivityItem["type"]) => {
  switch (type) {
    case "success":
      return "bg-green-500";
    case "info":
      return "bg-blue-500";
    case "warning":
      return "bg-yellow-500";
    case "error":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
};

export function RecentActivity({
  title = "Recent Activity",
  description = "Your recent account activity and updates",
  activities = defaultActivities,
  compact = false,
}: RecentActivityProps) {
  return (
    <Card>
      <CardHeader className={compact ? "pb-3" : ""}>
        <CardTitle
          className={`flex items-center gap-2 ${compact ? "text-base" : ""}`}
        >
          <Activity className={compact ? "h-4 w-4" : "h-5 w-5"} />
          {title}
        </CardTitle>
        {!compact && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center gap-3">
              <div
                className={`h-2 w-2 rounded-full ${getActivityColor(activity.type)}`}
              ></div>
              <div className="flex-1">
                <p className={`font-medium ${compact ? "text-sm" : "text-sm"}`}>
                  {activity.title}
                </p>
                <p
                  className={`text-muted-foreground ${compact ? "text-xs" : "text-xs"}`}
                >
                  {activity.description}
                </p>
              </div>
              <span
                className={`text-muted-foreground ${compact ? "text-xs" : "text-xs"}`}
              >
                {activity.timestamp}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
