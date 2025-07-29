"use client";

import { useState } from "react";
import { Check, Copy, Database, Palette, User, Zap } from "lucide-react";
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
import { useAppStore } from "@/lib/store/app-store";
import { useBreadcrumbStore } from "@/lib/store/breadcrumb-store";
import { useUIStore } from "@/lib/store/ui-store";
import { useUserStore } from "@/lib/store/user-store";

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
                <Zap className="h-4 w-4 mr-2" />
                Test
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

export default function StateDocsPage() {
  const { user, setUser, logout } = useUserStore();
  const { theme, setTheme, sidebarOpen, toggleSidebar } = useUIStore();
  const { isLoading, setLoading, addError } = useAppStore();
  const { items: breadcrumbs, setBreadcrumbs } = useBreadcrumbStore();

  const userStoreExamples = [
    {
      title: "User Store - Basic Usage",
      description: "Manage user authentication state and profile data",
      code: `import { useUserStore } from "@/lib/store/user-store";

const { user, setUser, logout } = useUserStore();

// Set user data
setUser({
  id: "user-123",
  email: "user@example.com",
  name: "John Doe",
  avatar_url: "https://example.com/avatar.jpg",
  created_at: "2024-01-01T00:00:00Z",
  updated_at: "2024-01-01T00:00:00Z"
});

// Logout user
logout();

// Access user data
console.log(user?.name); // "John Doe"`,
      onRun: () => {
        setUser({
          id: "demo-user",
          email: "demo@example.com",
          name: "Demo User",
          avatar_url: "https://github.com/shadcn.png",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });
      },
    },
    {
      title: "User Store - Persistence",
      description: "User store automatically persists data to localStorage",
      code: `// The user store uses Zustand persist middleware
// Data is automatically saved to localStorage
// No additional setup required

const { user, isAuthenticated } = useUserStore();

// Check if user is authenticated
if (isAuthenticated) {
  console.log("User is logged in:", user?.name);
} else {
  console.log("User is not authenticated");
}`,
    },
  ];

  const uiStoreExamples = [
    {
      title: "UI Store - Theme Management",
      description: "Manage application theme and UI state",
      code: `import { useUIStore } from "@/lib/store/ui-store";

const { theme, setTheme, toggleTheme } = useUIStore();

// Set specific theme
setTheme("dark"); // "light" | "dark" | "system"

// Toggle between light and dark
toggleTheme();

// Get current theme
console.log(theme); // "light" | "dark" | "system"`,
      onRun: () => {
        setTheme(theme === "dark" ? "light" : "dark");
      },
    },
    {
      title: "UI Store - Sidebar Management",
      description: "Control sidebar visibility and state",
      code: `import { useUIStore } from "@/lib/store/ui-store";

const { sidebarOpen, setSidebarOpen, toggleSidebar } = useUIStore();

// Toggle sidebar
toggleSidebar();

// Set sidebar state
setSidebarOpen(true);

// Check sidebar state
console.log(sidebarOpen); // true | false`,
      onRun: () => {
        toggleSidebar();
      },
    },
    {
      title: "UI Store - Notifications",
      description: "Show notifications using the UI store",
      code: `import { useUIStore } from "@/lib/store/ui-store";

const { showSuccess, showError, showWarning, showInfo } = useUIStore();

// Show different types of notifications
showSuccess("Success!", "Operation completed successfully");
showError("Error!", "Something went wrong");
showWarning("Warning!", "Please review your input");
showInfo("Info!", "New update available");`,
    },
  ];

  const appStoreExamples = [
    {
      title: "App Store - Loading States",
      description: "Manage global loading states and errors",
      code: `import { useAppStore } from "@/lib/store/app-store";

const { isLoading, setLoading, addError } = useAppStore();

// Set loading state
setLoading(true);

// Add error
addError({
  message: "Failed to load data",
  code: "LOAD_ERROR",
  status: 500
});

// Check loading state
console.log(isLoading); // true | false`,
      onRun: () => {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          addError({
            message: "Demo error added",
            code: "DEMO_ERROR",
          });
        }, 1000);
      },
    },
  ];

  const breadcrumbStoreExamples = [
    {
      title: "Breadcrumb Store - Programmatic Control",
      description: "Manage breadcrumbs programmatically",
      code: `import { useBreadcrumbStore } from "@/lib/store/breadcrumb-store";

const { setBreadcrumbs, generateBreadcrumbs } = useBreadcrumbStore();

// Set custom breadcrumbs
setBreadcrumbs([
  { label: "Dashboard", href: "/dashboard" },
  { label: "Projects", href: "/dashboard/projects" },
  { label: "Project Details" }
]);

// Generate breadcrumbs from route
generateBreadcrumbs("/dashboard/projects/123");`,
      onRun: () => {
        setBreadcrumbs([
          { label: "Dashboard", href: "/dashboard" },
          { label: "Documentation", href: "/dashboard/docs" },
          { label: "State Management" },
        ]);
      },
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">State Management</h1>
        <p className="text-muted-foreground">
          Zustand stores and Jotai atoms for global state management
        </p>
      </div>

      <div className="space-y-8">
        {/* User Store Section */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl font-semibold">User Store</h2>
            <Badge variant="secondary">useUserStore</Badge>
          </div>
          <p className="text-muted-foreground mb-6">
            Manages user authentication state, profile data, and preferences
            with automatic persistence.
          </p>

          <div className="space-y-6">
            {userStoreExamples.map((example, index) => (
              <CodeExample key={index} {...example} />
            ))}
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Current User State</CardTitle>
              <CardDescription>Real-time user store state</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span>User:</span>
                  <span className="font-mono">
                    {user?.name || "Not logged in"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Email:</span>
                  <span className="font-mono">{user?.email || "N/A"}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>ID:</span>
                  <span className="font-mono">{user?.id || "N/A"}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator />

        {/* UI Store Section */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl font-semibold">UI Store</h2>
            <Badge variant="secondary">useUIStore</Badge>
          </div>
          <p className="text-muted-foreground mb-6">
            Manages UI-related state like theme, sidebar, notifications, and
            modals.
          </p>

          <div className="space-y-6">
            {uiStoreExamples.map((example, index) => (
              <CodeExample key={index} {...example} />
            ))}
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Current UI State</CardTitle>
              <CardDescription>Real-time UI store state</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span>Theme:</span>
                  <Badge variant="outline">{theme}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Sidebar Open:</span>
                  <Badge variant={sidebarOpen ? "default" : "secondary"}>
                    {sidebarOpen ? "Yes" : "No"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator />

        {/* App Store Section */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl font-semibold">App Store</h2>
            <Badge variant="secondary">useAppStore</Badge>
          </div>
          <p className="text-muted-foreground mb-6">
            Manages global application state like loading indicators and errors.
          </p>

          <div className="space-y-6">
            {appStoreExamples.map((example, index) => (
              <CodeExample key={index} {...example} />
            ))}
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Current App State</CardTitle>
              <CardDescription>Real-time app store state</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span>Loading:</span>
                  <Badge variant={isLoading ? "default" : "secondary"}>
                    {isLoading ? "Yes" : "No"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator />

        {/* Breadcrumb Store Section */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl font-semibold">Breadcrumb Store</h2>
            <Badge variant="secondary">useBreadcrumbStore</Badge>
          </div>
          <p className="text-muted-foreground mb-6">
            Manages breadcrumb navigation state with automatic route-based
            generation.
          </p>

          <div className="space-y-6">
            {breadcrumbStoreExamples.map((example, index) => (
              <CodeExample key={index} {...example} />
            ))}
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Current Breadcrumbs</CardTitle>
              <CardDescription>Real-time breadcrumb state</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span>Breadcrumb Count:</span>
                  <Badge variant="outline">{breadcrumbs.length}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Current Path:</span>
                  <span className="font-mono text-xs">
                    {breadcrumbs.map((b) => b.label).join(" > ") || "None"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator />

        {/* Jotai Atoms Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Jotai Atoms</h2>
          <p className="text-muted-foreground mb-6">
            Reactive atoms for fine-grained state management and computed
            values.
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  User Atoms
                </CardTitle>
                <CardDescription>User-related reactive atoms</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span>userAtom</span>
                    <Badge variant="outline">User</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>sessionAtom</span>
                    <Badge variant="outline">Session</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>isAuthenticatedAtom</span>
                    <Badge variant="outline">Computed</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Theme Atoms
                </CardTitle>
                <CardDescription>Theme-related reactive atoms</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span>themeAtom</span>
                    <Badge variant="outline">Theme</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>systemThemeAtom</span>
                    <Badge variant="outline">System</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>effectiveThemeAtom</span>
                    <Badge variant="outline">Computed</Badge>
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
