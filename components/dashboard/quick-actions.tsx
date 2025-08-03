"use client";

import Link from "next/link";
import { Bell, FileText, Settings, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface QuickAction {
  label: string;
  href?: string;
  icon: React.ComponentType<{ className?: string }>;
  onClick?: () => void;
}

interface QuickActionsProps {
  title?: string;
  description?: string;
  actions?: QuickAction[];
  compact?: boolean;
}

const defaultActions: QuickAction[] = [
  {
    label: "Account Settings",
    href: "/dashboard/account",
    icon: Settings,
  },
  {
    label: "Documentation",
    href: "/dashboard/docs",
    icon: FileText,
  },
  {
    label: "Notifications",
    icon: Bell,
  },
];

export function QuickActions({
  title = "Quick Actions",
  description = "Common tasks and shortcuts",
  actions = defaultActions,
  compact = false,
}: QuickActionsProps) {
  return (
    <Card>
      <CardHeader className={compact ? "pb-3" : ""}>
        <CardTitle
          className={`flex items-center gap-2 ${compact ? "text-base" : ""}`}
        >
          <Zap className={compact ? "h-4 w-4" : "h-5 w-5"} />
          {title}
        </CardTitle>
        {!compact && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-3">
        {actions.map((action, index) => {
          const Icon = action.icon;
          const buttonContent = (
            <Button
              variant="outline"
              className={`w-full justify-start ${compact ? "h-9 text-sm" : "h-10"}`}
              onClick={action.onClick}
            >
              <Icon className={`mr-2 ${compact ? "h-3 w-3" : "h-4 w-4"}`} />
              {action.label}
            </Button>
          );

          if (action.href) {
            return (
              <div key={index} className="block">
                <Link href={action.href} className="block">
                  {buttonContent}
                </Link>
              </div>
            );
          }

          return <div key={index}>{buttonContent}</div>;
        })}
      </CardContent>
    </Card>
  );
}
