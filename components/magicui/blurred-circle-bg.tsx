import React from "react";
import { cn } from "@/lib/utils";

interface BlurredCircleBgProps {
    size?: string; // e.g. 'h-60 w-60'
    className?: string;
    style?: React.CSSProperties;
    colors?: string; // Tailwind bg-gradient classes or custom radial
    position?: string; // e.g. 'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
    blur?: string; // e.g. 'blur-2xl'
    zIndex?: string; // e.g. '-z-10'
}

export const BlurredCircleBg: React.FC<BlurredCircleBgProps> = ({
    size = "h-60 w-60",
    className = "",
    style = {},
    colors = "",
    position = "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
    blur = "blur-2xl",
    zIndex = "-z-10",
}) => (
    <div
        className={cn(
            "pointer-events-none absolute rounded-full",
            size,
            position,
            blur,
            zIndex,
            className
        )}
        style={{
            background:
                colors ||
                "radial-gradient(circle, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.2) 60%, rgba(255,255,255,0) 100%)",
            ...style,
        }}
        aria-hidden="true"
    />
);

export const BlurredWhiteCircleBg: React.FC<
    Omit<BlurredCircleBgProps, "colors">
> = (props) => (
    <BlurredCircleBg
        colors="radial-gradient(circle, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.15) 60%, rgba(255,255,255,0) 100%)"
        {...props}
    />
);
