"use client";

import React from "react";
import { Home, Sparkles, Wallet, Info, Moon } from "lucide-react";

import { Dock, DockIcon } from "@/components/landing/magicui/dock";
import { useDarkMode } from "@/lib/useDarkMode";
import { cn } from "@/lib/utils";

export type IconProps = React.HTMLAttributes<SVGElement>;

export default function Navbar() {
    const [isDark, toggleDark] = useDarkMode();

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
                    <DockIcon>
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
