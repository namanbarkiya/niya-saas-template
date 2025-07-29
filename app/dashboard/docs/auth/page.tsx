"use client";

import { useState } from "react";
import { Check, Copy, Key, Shield, User } from "lucide-react";
import { useAuth } from "@/components/providers/auth-provider";
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
import {
  useCurrentSession,
  useCurrentUser,
  useLogin,
  useLogout,
} from "@/lib/query/hooks/auth";

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
                <Shield className="h-4 w-4 mr-2" />
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

export default function AuthDocsPage() {
  const { user, isAuthenticated } = useAuth();
  const { data: currentUser, isLoading: userLoading } = useCurrentUser();
  const { data: session, isLoading: sessionLoading } = useCurrentSession();
  const loginMutation = useLogin();
  const logoutMutation = useLogout();

  const authProviderExamples = [
    {
      title: "Auth Provider - Basic Usage",
      description: "Use the auth provider to access authentication state",
      code: `import { useAuth } from "@/components/providers/auth-provider";

const { user, isAuthenticated, isLoading } = useAuth();

// Check if user is authenticated
if (isAuthenticated) {
  console.log("User is logged in:", user?.name);
} else {
  console.log("User is not authenticated");
}

// Access user data
console.log(user?.email); // user@example.com
console.log(user?.name); // John Doe`,
    },
    {
      title: "Auth Provider - Loading States",
      description: "Handle loading states during authentication",
      code: `import { useAuth } from "@/components/providers/auth-provider";

const { isLoading } = useAuth();

if (isLoading) {
  return <div>Loading authentication...</div>;
}

// Rest of your component`,
    },
  ];

  const queryHooksExamples = [
    {
      title: "useCurrentUser Hook",
      description: "React Query hook to get current user data",
      code: `import { useCurrentUser } from "@/lib/query/hooks/auth";

const { data: user, isLoading, error } = useCurrentUser();

if (isLoading) {
  return <div>Loading user...</div>;
}

if (error) {
  return <div>Error loading user</div>;
}

console.log(user?.name); // User name`,
    },
    {
      title: "useCurrentSession Hook",
      description: "React Query hook to get current session",
      code: `import { useCurrentSession } from "@/lib/query/hooks/auth";

const { data: session, isLoading, error } = useCurrentSession();

if (isLoading) {
  return <div>Loading session...</div>;
}

console.log(session?.access_token); // Session token`,
    },
    {
      title: "useLogin Hook",
      description: "React Query mutation for user login",
      code: `import { useLogin } from "@/lib/query/hooks/auth";

const loginMutation = useLogin();

const handleLogin = async () => {
  try {
    await loginMutation.mutateAsync({
      email: "user@example.com",
      password: "password123"
    });
    // Login successful
  } catch (error) {
    // Handle login error
    console.error("Login failed:", error);
  }
};

// In your component
<Button 
  onClick={handleLogin}
  disabled={loginMutation.isPending}
>
  {loginMutation.isPending ? "Logging in..." : "Login"}
</Button>`,
      onRun: () => {
        // Demo login (this would fail in real app)
        console.log("Demo login attempt");
      },
    },
    {
      title: "useLogout Hook",
      description: "React Query mutation for user logout",
      code: `import { useLogout } from "@/lib/query/hooks/auth";

const logoutMutation = useLogout();

const handleLogout = async () => {
  try {
    await logoutMutation.mutateAsync();
    // Logout successful
  } catch (error) {
    // Handle logout error
    console.error("Logout failed:", error);
  }
};

// In your component
<Button 
  onClick={handleLogout}
  disabled={logoutMutation.isPending}
>
  {logoutMutation.isPending ? "Logging out..." : "Logout"}
</Button>`,
      onRun: () => {
        // Demo logout
        console.log("Demo logout attempt");
      },
    },
  ];

  const authGuardExamples = [
    {
      title: "AuthGuard Component",
      description: "Protect routes based on authentication status",
      code: `import { AuthGuard } from "@/components/auth";

// Protect a page
export default function ProtectedPage() {
  return (
    <AuthGuard requireAuth={true} redirectTo="/login">
      <div>This page is protected</div>
    </AuthGuard>
  );
}

// Optional authentication
export default function OptionalAuthPage() {
  return (
    <AuthGuard requireAuth={false}>
      <div>This page works with or without auth</div>
    </AuthGuard>
  );
}`,
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Authentication</h1>
        <p className="text-muted-foreground">
          Authentication hooks, providers, and utilities for Supabase auth
        </p>
      </div>

      <div className="space-y-8">
        {/* Auth Provider Section */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl font-semibold">Auth Provider</h2>
            <Badge variant="secondary">useAuth</Badge>
          </div>
          <p className="text-muted-foreground mb-6">
            The auth provider provides global authentication state and user
            data.
          </p>

          <div className="space-y-6">
            {authProviderExamples.map((example, index) => (
              <CodeExample key={index} {...example} />
            ))}
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Current Auth State</CardTitle>
              <CardDescription>
                Real-time authentication state from the provider
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span>Authenticated:</span>
                  <Badge variant={isAuthenticated ? "default" : "secondary"}>
                    {isAuthenticated ? "Yes" : "No"}
                  </Badge>
                </div>
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
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator />

        {/* Query Hooks Section */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl font-semibold">React Query Hooks</h2>
            <Badge variant="secondary">useCurrentUser</Badge>
          </div>
          <p className="text-muted-foreground mb-6">
            React Query hooks for fetching user data and managing authentication
            mutations.
          </p>

          <div className="space-y-6">
            {queryHooksExamples.map((example, index) => (
              <CodeExample key={index} {...example} />
            ))}
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Query Hook States</CardTitle>
              <CardDescription>
                Current state of React Query hooks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span>useCurrentUser Loading:</span>
                  <Badge variant={userLoading ? "default" : "secondary"}>
                    {userLoading ? "Yes" : "No"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>useCurrentSession Loading:</span>
                  <Badge variant={sessionLoading ? "default" : "secondary"}>
                    {sessionLoading ? "Yes" : "No"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Current User:</span>
                  <span className="font-mono">
                    {currentUser?.email || "N/A"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Session:</span>
                  <span className="font-mono">
                    {session ? "Active" : "None"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator />

        {/* Auth Guard Section */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl font-semibold">Route Protection</h2>
            <Badge variant="secondary">AuthGuard</Badge>
          </div>
          <p className="text-muted-foreground mb-6">
            Protect routes and pages based on authentication status.
          </p>

          <div className="space-y-6">
            {authGuardExamples.map((example, index) => (
              <CodeExample key={index} {...example} />
            ))}
          </div>
        </section>

        <Separator />

        {/* Authentication Flow */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Authentication Flow</h2>
          <p className="text-muted-foreground mb-6">
            Complete authentication flow with Supabase integration.
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  User Management
                </CardTitle>
                <CardDescription>
                  User-related authentication features
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span>Email/Password Login</span>
                    <Badge variant="outline">useLogin</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>User Registration</span>
                    <Badge variant="outline">useSignup</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>User Logout</span>
                    <Badge variant="outline">useLogout</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Current User</span>
                    <Badge variant="outline">useCurrentUser</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5" />
                  Session Management
                </CardTitle>
                <CardDescription>Session and token management</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span>Session Tracking</span>
                    <Badge variant="outline">useCurrentSession</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Token Refresh</span>
                    <Badge variant="outline">Automatic</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Route Protection</span>
                    <Badge variant="outline">AuthGuard</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Global State</span>
                    <Badge variant="outline">useAuth</Badge>
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
