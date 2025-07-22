"use client";

import React from "react";

import { Dock, DockIcon } from "@/components/magicui/dock";
import { Home, Sparkles, Wallet, Info, Mail } from "lucide-react";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

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
        <div className="fixed top-0 left-0 w-full z-50">
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
                    <DockIcon
                        onClick={toggleDark}
                        aria-label="Toggle dark mode"
                        className="cursor-pointer"
                    >
                        {isDark ? (
                            <Sun className="size-full text-yellow-500" />
                        ) : (
                            <Moon className="size-full text-neutral-700" />
                        )}
                    </DockIcon>
                </Dock>
            </div>
        </div>
    );
}
