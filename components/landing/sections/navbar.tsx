"use client";

import React from "react";
import {
    Home,
    Sparkles,
    Github,
    ExternalLink,
    Moon,
    Code,
    BookOpen,
} from "lucide-react";

import { Dock, DockIcon } from "@/components/landing/magicui/dock";
import { useDarkMode } from "@/lib/useDarkMode";
import { cn } from "@/lib/utils";

export type IconProps = React.HTMLAttributes<SVGElement>;

export default function Navbar() {
    const [isDark, toggleDark] = useDarkMode();

    const handleGitHubClick = () => {
        window.open(
            "https://github.com/namanbarkiya/niya-saas-template",
            "_blank"
        );
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

    return (
        <div className="fixed top-0 left-0 w-full z-50">
            <div className="flex items-center justify-between w-full px-6 pt-2">
                {/* Navigation Dock */}
                <Dock iconMagnification={60} iconDistance={100}>
                    <DockIcon title="Home">
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
                    <DockIcon
                        title="View on GitHub"
                        onClick={handleGitHubClick}
                    >
                        <Github className="size-full text-neutral-600 dark:text-neutral-300/70" />
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
