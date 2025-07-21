"use client";

import React from "react";

import { Dock, DockIcon } from "@/components/magicui/dock";
import { Home, Sparkles, Wallet, Info, Mail } from "lucide-react";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";
import { BlurredCircleBg } from "@/components/magicui/blurred-circle-bg";

export type IconProps = React.HTMLAttributes<SVGElement>;

export default function Navbar() {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setIsDark(document.documentElement.classList.contains("dark"));
        }
    }, []);

    const toggleDark = () => {
        if (typeof window !== "undefined") {
            document.documentElement.classList.toggle("dark");
            setIsDark(document.documentElement.classList.contains("dark"));
        }
    };

    return (
        <div className="absolute top-0 left-0 w-full z-50">
            {/* <BlurredCircleBg /> */}
            <div className="flex items-center justify-between w-full px-6 pt-2">
                <Dock iconMagnification={60} iconDistance={100}>
                    <DockIcon>
                        <Home className="size-full text-neutral-600  dark:text-neutral-300/70" />
                    </DockIcon>
                    <DockIcon>
                        <Sparkles className="size-full text-neutral-600  dark:text-neutral-300/70" />
                    </DockIcon>
                    <DockIcon>
                        <Wallet className="size-full text-neutral-600  dark:text-neutral-300/70" />
                    </DockIcon>
                    <DockIcon>
                        <Info className="size-full text-neutral-600  dark:text-neutral-300/70" />
                    </DockIcon>
                    <DockIcon>
                        <Mail className="size-full text-neutral-600  dark:text-neutral-300/70" />
                    </DockIcon>
                </Dock>
                <button
                    aria-label="Toggle dark mode"
                    onClick={toggleDark}
                    className="ml-4 rounded-full p-2 transition-colors hover:bg-neutral-200 dark:hover:bg-neutral-800"
                >
                    {isDark ? (
                        <Sun className="size-6 text-yellow-500" />
                    ) : (
                        <Moon className="size-6 text-neutral-700" />
                    )}
                </button>
            </div>
        </div>
    );
}
