"use client";

import { useState } from "react";
import { AlertTriangle, Bug, Check, Copy, Shield, Zap } from "lucide-react";
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
import { useNotifications } from "@/lib/hooks/use-notifications";
import { ErrorHandler } from "@/lib/utils/error-handler";

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

export default function ErrorsDocsPage() {
  const { error, success } = useNotifications();

  const errorHandlerExamples = [
    {
      title: "Basic Error Handling",
      description: "Handle any error with automatic notification",
      code: `import { ErrorHandler } from "@/lib/utils/error-handler";

// Handle any error
try {
  // Your code that might throw an error
  throw new Error("Something went wrong");
} catch (error) {
  ErrorHandler.handle(error, "User Action");
}

// With context
try {
  await fetchData();
} catch (error) {
  ErrorHandler.handle(error, "Data Fetching");
}`,
      onRun: () => {
        try {
          throw new Error("Demo error for testing");
        } catch (error) {
          ErrorHandler.handle(error, "Demo Error");
        }
      },
    },
    {
      title: "Supabase Error Handling",
      description: "Handle Supabase-specific errors with proper messages",
      code: `import { ErrorHandler } from "@/lib/utils/error-handler";

// Supabase authentication errors
try {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: "user@example.com",
    password: "password"
  });
  
  if (error) throw error;
} catch (error) {
  ErrorHandler.handle(error, "Authentication");
}

// Supabase database errors
try {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId);
    
  if (error) throw error;
} catch (error) {
  ErrorHandler.handle(error, "Database Query");
}`,
      onRun: () => {
        // Simulate Supabase error
        const mockSupabaseError = {
          message: "Invalid login credentials",
          status: 401,
          code: "INVALID_CREDENTIALS",
        };
        ErrorHandler.handle(mockSupabaseError, "Authentication");
      },
    },
    {
      title: "Network Error Handling",
      description: "Handle network and connectivity errors",
      code: `import { ErrorHandler } from "@/lib/utils/error-handler";

// Network errors are automatically detected
try {
  const response = await fetch('/api/data');
  if (!response.ok) {
    throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
  }
} catch (error) {
  ErrorHandler.handle(error, "API Request");
}

// Offline detection
if (!navigator.onLine) {
  ErrorHandler.handle(
    new Error("No internet connection"),
    "Network"
  );
}`,
      onRun: () => {
        const networkError = new Error(
          "Network error. Please check your connection and try again."
        );
        networkError.name = "NetworkError";
        ErrorHandler.handle(networkError, "Network");
      },
    },
    {
      title: "Validation Error Handling",
      description: "Handle Zod validation errors",
      code: `import { ErrorHandler } from "@/lib/utils/error-handler";
import { z } from "zod";

const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

try {
  const validatedData = userSchema.parse({
    email: "invalid-email",
    password: "123"
  });
} catch (error) {
  ErrorHandler.handle(error, "Form Validation");
}`,
      onRun: () => {
        // Simulate Zod validation error
        const zodError = {
          name: "ZodError",
          errors: [
            { message: "Invalid email address" },
            { message: "Password must be at least 8 characters" },
          ],
        };
        ErrorHandler.handle(zodError, "Form Validation");
      },
    },
  ];

  const notificationExamples = [
    {
      title: "Error Notifications",
      description: "Show error notifications with proper handling",
      code: `import { useNotifications } from "@/lib/hooks/use-notifications";

const { error, handleError } = useNotifications();

// Show error notification
error("Login Failed", "Invalid email or password");

// Handle errors with automatic notification
try {
  await loginUser();
} catch (error) {
  handleError(error, "Login");
}

// Custom error handling
try {
  await saveData();
} catch (error) {
  error("Save Failed", "Unable to save your changes. Please try again.");
}`,
      onRun: () => {
        error("Demo Error", "This is a demo error notification");
      },
    },
  ];

  const errorBoundaryExamples = [
    {
      title: "Error Boundary Component",
      description: "Catch and handle React component errors",
      code: `import { ErrorBoundary } from "@/components/error";

// Wrap your app or components
<ErrorBoundary>
  <YourComponent />
</ErrorBoundary>

// With custom fallback
<ErrorBoundary
  fallback={({ error, resetError }) => (
    <div className="p-4 border rounded-lg">
      <h2>Something went wrong</h2>
      <p>{error.message}</p>
      <button onClick={resetError}>Try again</button>
    </div>
  )}
>
  <YourComponent />
</ErrorBoundary>`,
    },
  ];

  const errorTypes = [
    {
      title: "Authentication Errors",
      description: "Common authentication error patterns",
      code: `// Invalid credentials
ErrorHandler.handle({
  message: "Invalid login credentials",
  status: 401,
  code: "INVALID_CREDENTIALS"
}, "Authentication");

// Email not confirmed
ErrorHandler.handle({
  message: "Email not confirmed",
  status: 401,
  code: "EMAIL_NOT_CONFIRMED"
}, "Authentication");

// User already exists
ErrorHandler.handle({
  message: "User already registered",
  status: 400,
  code: "USER_EXISTS"
}, "Registration");`,
    },
    {
      title: "Network Errors",
      description: "Network and connectivity error handling",
      code: `// Network connectivity
ErrorHandler.handle({
  name: "NetworkError",
  message: "No internet connection"
}, "Network");

// API timeout
ErrorHandler.handle({
  name: "TimeoutError",
  message: "Request timed out"
}, "API");

// Server errors
ErrorHandler.handle({
  message: "Internal server error",
  status: 500
}, "Server");`,
    },
    {
      title: "Validation Errors",
      description: "Form and data validation errors",
      code: `// Zod validation errors
ErrorHandler.handle({
  name: "ZodError",
  errors: [
    { message: "Email is required" },
    { message: "Password must be at least 8 characters" }
  ]
}, "Validation");

// Custom validation
ErrorHandler.handle({
  message: "Username already taken",
  code: "USERNAME_EXISTS"
}, "Registration");`,
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Error Handling</h1>
        <p className="text-muted-foreground">
          Comprehensive error handling utilities and patterns for robust
          applications
        </p>
      </div>

      <div className="space-y-8">
        {/* ErrorHandler Section */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl font-semibold">ErrorHandler Class</h2>
            <Badge variant="secondary">ErrorHandler</Badge>
          </div>
          <p className="text-muted-foreground mb-6">
            Centralized error handling with automatic error type detection and
            user-friendly notifications.
          </p>

          <div className="space-y-6">
            {errorHandlerExamples.map((example, index) => (
              <CodeExample key={index} {...example} />
            ))}
          </div>
        </section>

        <Separator />

        {/* Error Types Section */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl font-semibold">Error Types</h2>
            <Badge variant="secondary">Patterns</Badge>
          </div>
          <p className="text-muted-foreground mb-6">
            Common error patterns and how to handle them effectively.
          </p>

          <div className="space-y-6">
            {errorTypes.map((example, index) => (
              <CodeExample key={index} {...example} />
            ))}
          </div>
        </section>

        <Separator />

        {/* Notifications Section */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl font-semibold">Error Notifications</h2>
            <Badge variant="secondary">useNotifications</Badge>
          </div>
          <p className="text-muted-foreground mb-6">
            Show user-friendly error notifications with proper error handling.
          </p>

          <div className="space-y-6">
            {notificationExamples.map((example, index) => (
              <CodeExample key={index} {...example} />
            ))}
          </div>
        </section>

        <Separator />

        {/* Error Boundaries Section */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl font-semibold">Error Boundaries</h2>
            <Badge variant="secondary">ErrorBoundary</Badge>
          </div>
          <p className="text-muted-foreground mb-6">
            React error boundaries for catching component errors and providing
            fallback UI.
          </p>

          <div className="space-y-6">
            {errorBoundaryExamples.map((example, index) => (
              <CodeExample key={index} {...example} />
            ))}
          </div>
        </section>

        <Separator />

        {/* Best Practices */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Best Practices</h2>
          <p className="text-muted-foreground mb-6">
            Guidelines for effective error handling in your application.
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Error Handling
                </CardTitle>
                <CardDescription>
                  Best practices for error handling
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span>Always provide context</span>
                    <Badge variant="outline">Required</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Use user-friendly messages</span>
                    <Badge variant="outline">Required</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Log errors for debugging</span>
                    <Badge variant="outline">Recommended</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Provide recovery options</span>
                    <Badge variant="outline">Recommended</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Error Prevention
                </CardTitle>
                <CardDescription>
                  Prevent errors before they occur
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span>Input validation</span>
                    <Badge variant="outline">Zod</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Type safety</span>
                    <Badge variant="outline">TypeScript</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Loading states</span>
                    <Badge variant="outline">UI</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Error boundaries</span>
                    <Badge variant="outline">React</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator />

        {/* Error Flow */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Error Handling Flow</h2>
          <p className="text-muted-foreground mb-6">
            Complete error handling flow from detection to user notification.
          </p>

          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bug className="h-5 w-5" />
                  Error Detection
                </CardTitle>
                <CardDescription>
                  How errors are detected and captured
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span>Try-catch blocks</span>
                    <Badge variant="outline">Manual</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Error boundaries</span>
                    <Badge variant="outline">React</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Promise rejection</span>
                    <Badge variant="outline">Async</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>API responses</span>
                    <Badge variant="outline">HTTP</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Error Processing
                </CardTitle>
                <CardDescription>
                  How errors are processed and categorized
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span>Error type detection</span>
                    <Badge variant="outline">Automatic</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Message extraction</span>
                    <Badge variant="outline">Smart</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Context addition</span>
                    <Badge variant="outline">Manual</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Logging</span>
                    <Badge variant="outline">Console</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  User Notification
                </CardTitle>
                <CardDescription>
                  How errors are presented to users
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span>Toast notifications</span>
                    <Badge variant="outline">Sonner</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Error boundaries</span>
                    <Badge variant="outline">Fallback UI</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Form validation</span>
                    <Badge variant="outline">Inline</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Loading states</span>
                    <Badge variant="outline">Feedback</Badge>
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
