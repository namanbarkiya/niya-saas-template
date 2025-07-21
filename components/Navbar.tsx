"use client";

import React from "react";

import { Dock, DockIcon } from "@/components/magicui/dock";
import { Home, Sparkles, Wallet, Info, Mail } from "lucide-react";

export type IconProps = React.HTMLAttributes<SVGElement>;

export default function Navbar() {
    return (
        <div className="absolute top-0 left-0 w-full z-50">
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-60 w-60 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-pink-100/40 via-blue-100/30 to-white/0 blur-2xl -z-10" />
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
        </div>
    );
}
