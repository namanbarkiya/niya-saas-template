"use client";

import {
  AlertCircle,
  Bell,
  Calendar,
  CheckCircle,
  Info,
  LogOut,
  Mail,
  User,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/components/providers/auth-provider";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNotifications } from "@/lib/hooks/use-notifications";
import { useLogout } from "@/lib/query/hooks/auth";

export default function DashboardPage() {
  const { user, isLoading } = useAuth();
  const logoutMutation = useLogout();
  const { success, error, warning, info } = useNotifications();

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Notification demo functions using consolidated notification service
  const showSuccessToast = () => {
    success("Success!", "This is a success notification with a description.");
  };

  const showErrorToast = () => {
    error("Error!", "This is an error notification with a description.");
  };

  const showWarningToast = () => {
    warning("Warning!", "This is a warning notification with a description.");
  };

  const showInfoToast = () => {
    info("Info!", "This is an info notification with a description.");
  };

  const showPromiseToast = () => {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        Math.random() > 0.5 ? resolve("Success!") : reject("Failed!");
      }, 2000);
    });

    // For promise toasts, we still need to use toast directly since ErrorHandler doesn't have a promise method
    toast.promise(promise, {
      loading: "Loading...",
      success: "Promise resolved successfully!",
      error: "Promise rejected!",
    });
  };

  const showCustomToast = () => {
    // For custom toasts with actions, we still need to use toast directly
    toast("Custom Toast", {
      description: "This is a custom toast with custom styling.",
      duration: 10000,
      action: {
        label: "Undo",
        onClick: () => console.log("Undo clicked"),
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="text-sm text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome to your dashboard</p>
        </div>
        <Button
          variant="outline"
          onClick={handleLogout}
          disabled={logoutMutation.isPending}
        >
          <LogOut className="mr-2 h-4 w-4" />
          {logoutMutation.isPending ? "Logging out..." : "Logout"}
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Information
            </CardTitle>
            <CardDescription>
              Your account details and preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{user?.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{user?.name || "No name set"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">
                Member since{" "}
                {user?.created_at
                  ? new Date(user.created_at).toLocaleDateString()
                  : "Unknown"}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start">
              Edit Profile
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Change Password
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Notification Settings
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest actions and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              No recent activity to display.
            </p>
          </CardContent>
        </Card>

        {/* Sonner Notification Demo Card */}
        <Card className="md:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notification Testing
            </CardTitle>
            <CardDescription>
              Test consolidated notification service with UI Store integration
              and error handling
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              <Button
                variant="outline"
                onClick={showSuccessToast}
                className="flex items-center gap-2"
              >
                <CheckCircle className="h-4 w-4 text-green-500" />
                Success Toast
              </Button>

              <Button
                variant="outline"
                onClick={showErrorToast}
                className="flex items-center gap-2"
              >
                <XCircle className="h-4 w-4 text-red-500" />
                Error Toast
              </Button>

              <Button
                variant="outline"
                onClick={showWarningToast}
                className="flex items-center gap-2"
              >
                <AlertCircle className="h-4 w-4 text-yellow-500" />
                Warning Toast
              </Button>

              <Button
                variant="outline"
                onClick={showInfoToast}
                className="flex items-center gap-2"
              >
                <Info className="h-4 w-4 text-blue-500" />
                Info Toast
              </Button>

              <Button
                variant="outline"
                onClick={showPromiseToast}
                className="flex items-center gap-2"
              >
                <Bell className="h-4 w-4" />
                Promise Toast
              </Button>

              <Button
                variant="outline"
                onClick={showCustomToast}
                className="flex items-center gap-2"
              >
                <Bell className="h-4 w-4" />
                Custom Toast
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
