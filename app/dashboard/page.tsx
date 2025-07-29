"use client";

import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Calendar,
  Code,
  ExternalLink,
  Mail,
  Palette,
  Shield,
  User,
} from "lucide-react";
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

export default function DashboardPage() {
  const { user, isLoading } = useAuth();

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

  const templateFeatures = [
    {
      title: "UI Components",
      description: "shadcn/ui + Magic UI",
      icon: Palette,
      href: "/dashboard/docs/components",
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-950",
    },
    {
      title: "State Management",
      description: "Zustand + Jotai",
      icon: Code,
      href: "/dashboard/docs/state",
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-950",
    },
    {
      title: "Authentication",
      description: "Supabase + React Query",
      icon: Shield,
      href: "/dashboard/docs/auth",
      color: "text-red-600",
      bgColor: "bg-red-50 dark:bg-red-950",
    },
    {
      title: "Error Handling",
      description: "Comprehensive patterns",
      icon: AlertTriangle,
      href: "/dashboard/docs/errors",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50 dark:bg-yellow-950",
    },
  ];

  const quickLinks = [
    {
      title: "Documentation",
      description: "Browse all docs",
      href: "/dashboard/docs",
      icon: BookOpen,
    },
    {
      title: "Account Settings",
      description: "Manage your profile",
      href: "/dashboard/account",
      icon: User,
    },
  ];

  return (
    <div className="space-y-8 p-6">
      {/* Header Section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {user?.name || "User"}! Here&apos;s an overview of your
          template.
        </p>
      </div>

      {/* Template Features Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Template Features</h2>
          <Link href="/dashboard/docs">
            <Button variant="outline" size="sm">
              View All Docs
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {templateFeatures.map((feature) => (
            <Link key={feature.href} href={feature.href}>
              <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer group">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg ${feature.bgColor} group-hover:scale-110 transition-transform`}
                    >
                      <feature.icon className={`h-5 w-5 ${feature.color}`} />
                    </div>
                    <div>
                      <CardTitle className="text-base">
                        {feature.title}
                      </CardTitle>
                      <CardDescription className="text-xs">
                        {feature.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* User Profile Card */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Information
            </CardTitle>
            <CardDescription>
              Your account details and preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{user?.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{user?.name || "No name set"}</span>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">
                Member since{" "}
                {user?.created_at
                  ? new Date(user.created_at).toLocaleDateString()
                  : "Unknown"}
              </span>
            </div>
            <div className="pt-2">
              <Link href="/dashboard/account">
                <Button variant="outline" size="sm" className="w-full">
                  Edit Profile
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Quick Links Card */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Links</CardTitle>
            <CardDescription>Access important sections quickly</CardDescription>
          </CardHeader>
          <CardContent>
            {quickLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Button
                  variant="outline"
                  className="w-full justify-start h-auto p-3 mb-2"
                  asChild
                >
                  <div className="flex items-center gap-3">
                    <link.icon className="h-4 w-4" />
                    <div className="flex-1 text-left">
                      <div className="font-medium">{link.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {link.description}
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </Button>
              </Link>
            ))}
          </CardContent>
        </Card>

        {/* Template Status Card */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle>Template Status</CardTitle>
            <CardDescription>Current setup and configuration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Authentication</span>
                <Badge variant="secondary">Active</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">State Management</span>
                <Badge variant="secondary">Configured</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Error Handling</span>
                <Badge variant="secondary">Ready</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">UI Components</span>
                <Badge variant="secondary">Available</Badge>
              </div>
            </div>
            <div className="pt-2">
              <Button variant="outline" size="sm" className="w-full" asChild>
                <a
                  href="https://github.com/namanbarkiya/niya-saas-template"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Source
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Getting Started Section */}
      <section>
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Getting Started
            </CardTitle>
            <CardDescription>
              Learn how to use this template effectively
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="space-y-3">
                <h4 className="font-medium text-sm">
                  1. Explore Documentation
                </h4>
                <p className="text-xs text-muted-foreground">
                  Browse the comprehensive documentation to understand all
                  available features.
                </p>
                <Link href="/dashboard/docs">
                  <Button size="sm" variant="outline">
                    Browse Docs
                  </Button>
                </Link>
              </div>
              <div className="space-y-3">
                <h4 className="font-medium text-sm">2. Customize Components</h4>
                <p className="text-xs text-muted-foreground">
                  Modify UI components and add your own functionality.
                </p>
                <Link href="/dashboard/docs/components">
                  <Button size="sm" variant="outline">
                    View Components
                  </Button>
                </Link>
              </div>
              <div className="space-y-3">
                <h4 className="font-medium text-sm">3. Add Your Features</h4>
                <p className="text-xs text-muted-foreground">
                  Extend the template with your own pages and functionality.
                </p>
                <Button size="sm" variant="outline" disabled>
                  Coming Soon
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
