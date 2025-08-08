"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  duration?: number;
  threshold?: number;
}

export function RevealOnScroll({
  children,
  className,
  delay = 0,
  direction = "up",
  duration = 700,
  threshold = 0.1,
}: RevealOnScrollProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  const getTransform = () => {
    switch (direction) {
      case "up":
        return "translate-y-12";
      case "down":
        return "-translate-y-12";
      case "left":
        return "translate-x-12";
      case "right":
        return "-translate-x-12";
      default:
        return "translate-y-12";
    }
  };

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700",
        isVisible
          ? "opacity-100 translate-y-0 translate-x-0"
          : `opacity-0 ${getTransform()}`,
        className
      )}
      style={{
        transitionDelay: `${delay}ms`,
        transitionDuration: `${duration}ms`,
      }}
    >
      {children}
    </div>
  );
}
