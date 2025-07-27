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
        "text-3xl lg:text-5xl font-semibold text-center md:text-left tracking-tighter mb-6 sm:mb-10 mt-28 sm:mt-52",
        className
      )}
    >
      {title}
    </h2>
  );
}
