"use client";

import { useState } from "react";
import { Check, Code, Copy, Play } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useBreadcrumbs } from "@/lib/hooks/use-breadcrumbs";
import { useDarkMode } from "@/lib/hooks/use-dark-mode";
import { useNotifications } from "@/lib/hooks/use-notifications";

interface CodeExampleProps {
  title: string;
  description: string;
  code: string;
  language?: string;
  onRun?: () => void;
}

function CodeExample({
  title,
  description,
  code,
  language = "typescript",
  onRun,
}: CodeExampleProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <div className="flex gap-2">
            {onRun && (
              <Button size="sm" variant="outline" onClick={onRun}>
                <Play className="h-4 w-4 mr-2" />
                Run
              </Button>
            )}
            <Button size="sm" variant="outline" onClick={copyToClipboard}>
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
          <code className={`language-${language}`}>{code}</code>
        </pre>
      </CardContent>
    </Card>
  );
}

export default function HooksDocsPage() {
  const { success, error, warning, info } = useNotifications();
  const [isDark, toggleDark] = useDarkMode();

  const notificationExamples = [
    {
      title: "Success Notification",
      description: "Show a success notification with custom message",
      code: `import { useNotifications } from "@/lib/hooks/use-notifications";

const { success } = useNotifications();

// Basic usage
success("Operation completed successfully!");

// With description
success("Profile Updated", "Your profile has been updated successfully.");

// With custom duration (in milliseconds)
success("Data Saved", "Your changes have been saved.", 5000);`,
      onRun: () =>
        success("Success!", "This is a success notification example."),
    },
    {
      title: "Error Notification",
      description: "Show an error notification with error handling",
      code: `import { useNotifications } from "@/lib/hooks/use-notifications";

const { error } = useNotifications();

// Basic error
error("Something went wrong!");

// With detailed error message
error("Login Failed", "Invalid email or password. Please try again.");

// With custom duration
error("Network Error", "Unable to connect to server.", 8000);`,
      onRun: () => error("Error!", "This is an error notification example."),
    },
    {
      title: "Warning Notification",
      description: "Show a warning notification for important alerts",
      code: `import { useNotifications } from "@/lib/hooks/use-notifications";

const { warning } = useNotifications();

// Basic warning
warning("Please review your input");

// With description
warning("Unsaved Changes", "You have unsaved changes. Save before leaving?");

// With custom duration
warning("Storage Warning", "You're running low on storage space.", 6000);`,
      onRun: () =>
        warning("Warning!", "This is a warning notification example."),
    },
    {
      title: "Info Notification",
      description: "Show an informational notification",
      code: `import { useNotifications } from "@/lib/hooks/use-notifications";

const { info } = useNotifications();

// Basic info
info("New message received");

// With description
info("Update Available", "A new version is available for download.");

// With custom duration
info("Sync Complete", "All data has been synchronized.", 4000);`,
      onRun: () => info("Info!", "This is an info notification example."),
    },
  ];

  const breadcrumbExamples = [
    {
      title: "Basic Usage",
      description:
        "Use the breadcrumb hook to manage breadcrumbs programmatically",
      code: `import { useBreadcrumbs } from "@/lib/hooks/use-breadcrumbs";

const { setBreadcrumbs, setPageTitle } = useBreadcrumbs();

// Set custom breadcrumbs
setBreadcrumbs([
  { label: "Dashboard", href: "/dashboard" },
  { label: "Projects", href: "/dashboard/projects" },
  { label: "Project Details" }
]);

// Or use the convenience method
setPageTitle("My Custom Page", [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Section", href: "/dashboard/section" }
]);`,
    },
    {
      title: "With Icons",
      description: "Add icons to breadcrumb items for better visual hierarchy",
      code: `import { useBreadcrumbs } from "@/lib/hooks/use-breadcrumbs";
import { Home, Folder, File } from "lucide-react";

const { setBreadcrumbs } = useBreadcrumbs();

setBreadcrumbs([
  { label: "Dashboard", href: "/dashboard", icon: Home },
  { label: "Projects", href: "/dashboard/projects", icon: Folder },
  { label: "Project Details", icon: File }
]);`,
    },
  ];

  const darkModeExamples = [
    {
      title: "Basic Usage",
      description: "Toggle between light and dark modes",
      code: `import { useDarkMode } from "@/lib/hooks/use-dark-mode";

const [isDark, toggleDark] = useDarkMode();

// Check current mode
console.log(isDark); // true for dark, false for light

// Toggle mode
toggleDark();

// Use in JSX
return (
  <button onClick={toggleDark}>
    {isDark ? "Switch to Light" : "Switch to Dark"}
  </button>
);`,
      onRun: () => {
        toggleDark();
        toast.success("Theme toggled!");
      },
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Hooks & Utilities</h1>
        <p className="text-muted-foreground">
          Custom React hooks and utility functions for common use cases
        </p>
      </div>

      <div className="space-y-8">
        {/* Notifications Section */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl font-semibold">Notifications</h2>
            <Badge variant="secondary">useNotifications</Badge>
          </div>
          <p className="text-muted-foreground mb-6">
            The{" "}
            <code className="bg-muted px-1 py-0.5 rounded text-sm">
              useNotifications
            </code>{" "}
            hook provides a unified way to show notifications using Sonner toast
            library with proper error handling.
          </p>

          <div className="space-y-6">
            {notificationExamples.map((example, index) => (
              <CodeExample key={index} {...example} />
            ))}
          </div>
        </section>

        <Separator />

        {/* Breadcrumbs Section */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl font-semibold">Breadcrumbs</h2>
            <Badge variant="secondary">useBreadcrumbs</Badge>
          </div>
          <p className="text-muted-foreground mb-6">
            The{" "}
            <code className="bg-muted px-1 py-0.5 rounded text-sm">
              useBreadcrumbs
            </code>{" "}
            hook provides programmatic control over breadcrumb navigation with
            automatic route-based generation.
          </p>

          <div className="space-y-6">
            {breadcrumbExamples.map((example, index) => (
              <CodeExample key={index} {...example} />
            ))}
          </div>
        </section>

        <Separator />

        {/* Dark Mode Section */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl font-semibold">Dark Mode</h2>
            <Badge variant="secondary">useDarkMode</Badge>
          </div>
          <p className="text-muted-foreground mb-6">
            The{" "}
            <code className="bg-muted px-1 py-0.5 rounded text-sm">
              useDarkMode
            </code>{" "}
            hook provides easy dark mode toggling with localStorage persistence
            and system preference detection.
          </p>

          <div className="space-y-6">
            {darkModeExamples.map((example, index) => (
              <CodeExample key={index} {...example} />
            ))}
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Current Theme Status</CardTitle>
              <CardDescription>
                The current theme state and toggle functionality
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Current Mode:</span>
                  <Badge variant={isDark ? "default" : "secondary"}>
                    {isDark ? "Dark" : "Light"}
                  </Badge>
                </div>
                <Button onClick={toggleDark} variant="outline">
                  Toggle Theme
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator />

        {/* Additional Hooks */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Additional Hooks</h2>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  Authentication Hooks
                </CardTitle>
                <CardDescription>
                  React Query hooks for Supabase authentication
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span>useCurrentUser</span>
                    <Badge variant="outline">Query</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>useCurrentSession</span>
                    <Badge variant="outline">Query</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>useLogin</span>
                    <Badge variant="outline">Mutation</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>useSignup</span>
                    <Badge variant="outline">Mutation</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>useLogout</span>
                    <Badge variant="outline">Mutation</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  Utility Functions
                </CardTitle>
                <CardDescription>
                  Helper functions and utilities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span>cn (className utility)</span>
                    <Badge variant="outline">Utility</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>ErrorHandler</span>
                    <Badge variant="outline">Class</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>createClient (Supabase)</span>
                    <Badge variant="outline">Client</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
