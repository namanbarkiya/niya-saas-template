import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
    title: string;
    className?: string;
}
// reduce spacing between letters in font
export function SectionHeader({ title, className }: SectionHeaderProps) {
    return (
        <h2
            className={cn(
                "text-3xl lg:text-5xl font-semibold mb-4 text-center md:text-left tracking-tighter",
                className
            )}
        >
            {title}
        </h2>
    );
}
