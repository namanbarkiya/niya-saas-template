"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  Code,
  ExternalLink,
  Github,
  Home,
  LogIn,
  Moon,
  Sparkles,
  User,
} from "lucide-react";
import { useAuth } from "@/components/providers/auth-provider";
import { Dock, DockIcon } from "@/components/ui/magicui/dock";
import { useDarkMode } from "@/lib/hooks/use-dark-mode";
import { cn } from "@/lib/utils";

export type IconProps = React.HTMLAttributes<SVGElement>;

export default function Navbar() {
  const [isDark, toggleDark] = useDarkMode();
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  const handleGitHubClick = () => {
    window.open("https://github.com/namanbarkiya/niya-saas-template", "_blank");
  };

  const handleDemoClick = () => {
    window.open("https://saas.nbarkiya.xyz", "_blank");
  };

  const handleDocsClick = () => {
    window.open(
      "https://github.com/namanbarkiya/niya-saas-template/blob/main/project-details/technical-description.md",
      "_blank"
    );
  };

  const handleProfileClick = () => {
    if (isAuthenticated) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <div className="flex items-center justify-center w-full px-6 pt-4">
        {/* Navigation Dock */}
        <Dock
          iconMagnification={60}
          iconDistance={100}
          className="backdrop-blur-md backdrop-saturate-150 bg-white/40 dark:bg-neutral-900/40 border border-white/20 dark:border-white/10 shadow-xl shadow-black/5 dark:shadow-black/20"
        >
          <DockIcon
            title="Back to Top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <Home className="size-full text-neutral-600 dark:text-neutral-300/70" />
          </DockIcon>
          <DockIcon
            title="Features"
            onClick={() =>
              document
                .getElementById("features")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <Sparkles className="size-full text-neutral-600 dark:text-neutral-300/70" />
          </DockIcon>
          <DockIcon title="Documentation" onClick={handleDocsClick}>
            <BookOpen className="size-full text-neutral-600 dark:text-neutral-300/70" />
          </DockIcon>
          <DockIcon title="Live Demo" onClick={handleDemoClick}>
            <ExternalLink className="size-full text-neutral-600 dark:text-neutral-300/70" />
          </DockIcon>
          <DockIcon title="View on GitHub" onClick={handleGitHubClick}>
            <Github className="size-full text-neutral-600 dark:text-neutral-300/70" />
          </DockIcon>
          <DockIcon
            title={isAuthenticated ? "Dashboard" : "Login"}
            onClick={handleProfileClick}
          >
            {isAuthenticated ? (
              <User className="size-full text-neutral-600 dark:text-neutral-300/70" />
            ) : (
              <LogIn className="size-full text-neutral-600 dark:text-neutral-300/70" />
            )}
          </DockIcon>
          <DockIcon title="Toggle Theme">
            <Moon
              className={cn(
                "size-full text-gray-600",
                isDark && "dark:text-yellow-400"
              )}
              onClick={toggleDark}
            />
          </DockIcon>
        </Dock>
      </div>
    </div>
  );
}
