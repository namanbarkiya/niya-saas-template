"use client";

import Link from "next/link";
import {
  AlertTriangle,
  BookOpen,
  Code,
  Database,
  Palette,
  Shield,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const docCategories = [
  {
    title: "Hooks & Utilities",
    description:
      "Custom React hooks, notifications, breadcrumbs, and utility functions",
    icon: Code,
    href: "/dashboard/docs/hooks",
    color: "text-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-950",
    features: ["useNotifications", "useBreadcrumbs", "useDarkMode"],
  },
  {
    title: "State Management",
    description: "Zustand stores, Jotai atoms, and global state management",
    icon: Database,
    href: "/dashboard/docs/state",
    color: "text-green-600",
    bgColor: "bg-green-50 dark:bg-green-950",
    features: [
      "useUserStore",
      "useUIStore",
      "useAppStore",
      "useBreadcrumbStore",
    ],
  },
  {
    title: "UI Components",
    description: "Reusable UI components with shadcn/ui and Magic UI credits",
    icon: Palette,
    href: "/dashboard/docs/components",
    color: "text-purple-600",
    bgColor: "bg-purple-50 dark:bg-purple-950",
    features: ["Button", "Card", "Input", "Badge", "Avatar"],
  },
  {
    title: "Authentication",
    description: "Auth providers, guards, and React Query authentication hooks",
    icon: Shield,
    href: "/dashboard/docs/auth",
    color: "text-red-600",
    bgColor: "bg-red-50 dark:bg-red-950",
    features: ["AuthGuard", "useAuth", "useCurrentUser", "useLogin"],
  },
  {
    title: "Error Handling",
    description: "Error handling utilities, patterns, and error boundaries",
    icon: AlertTriangle,
    href: "/dashboard/docs/errors",
    color: "text-yellow-600",
    bgColor: "bg-yellow-50 dark:bg-yellow-950",
    features: ["ErrorHandler", "ErrorBoundary", "useNotifications"],
  },
];

export default function DocsPage() {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Documentation</h1>
        <p className="text-muted-foreground">
          Explore the components, hooks, utilities, and patterns available in
          this template
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {docCategories.map((category) => (
          <Link key={category.href} href={category.href}>
            <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer group">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg ${category.bgColor} group-hover:scale-110 transition-transform`}
                  >
                    <category.icon className={`h-6 w-6 ${category.color}`} />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{category.title}</CardTitle>
                    <CardDescription className="text-sm">
                      {category.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1">
                  {category.features.map((feature) => (
                    <Badge key={feature} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6">Quick Start Guide</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Getting Started
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Learn how to use the components and utilities in your project
                effectively.
              </p>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Browse documentation by category</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Copy code examples with one click</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Test components interactively</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span>View live state demonstrations</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Features & Benefits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Everything you need to build modern, robust applications.
              </p>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span>TypeScript support throughout</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span>Comprehensive error handling</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Best practices included</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Production-ready patterns</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6">Template Overview</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                UI Components
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                Built with shadcn/ui and enhanced with Magic UI animations.
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Core Components</span>
                  <Badge variant="secondary">shadcn/ui</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Animations</span>
                  <Badge variant="secondary">Magic UI</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Styling</span>
                  <Badge variant="secondary">Tailwind CSS</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                State Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                Robust state management with Zustand and Jotai.
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Global State</span>
                  <Badge variant="secondary">Zustand</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Reactive State</span>
                  <Badge variant="secondary">Jotai</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Server State</span>
                  <Badge variant="secondary">React Query</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Authentication
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                Complete authentication system with Supabase.
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Auth Provider</span>
                  <Badge variant="secondary">Supabase</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Route Protection</span>
                  <Badge variant="secondary">AuthGuard</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>User Management</span>
                  <Badge variant="secondary">React Query</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
