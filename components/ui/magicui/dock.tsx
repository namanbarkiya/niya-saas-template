"use client";

import React, { PropsWithChildren, useEffect, useRef, useState } from "react";
import {
  MotionProps,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { type VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

export interface DockProps extends VariantProps<typeof dockVariants> {
  className?: string;
  iconSize?: number;
  iconMagnification?: number;
  iconDistance?: number;
  direction?: "top" | "middle" | "bottom";
  children: React.ReactNode;
}

const DEFAULT_SIZE = 40;
const DEFAULT_MAGNIFICATION = 60;
const DEFAULT_DISTANCE = 140;

const MOBILE_DEFAULT_SIZE = 30;
const MOBILE_DEFAULT_MAGNIFICATION = 50;
const MOBILE_DEFAULT_DISTANCE = 120;

function useIsMobileSSR() {
  const [isMobile, setIsMobile] = useState<null | boolean>(null);
  useEffect(() => {
    const check = () =>
      setIsMobile(window.matchMedia("(max-width: 640px)").matches);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

const dockVariants = cva(
  "supports-backdrop-blur:bg-white/10 supports-backdrop-blur:dark:bg-black/10 mx-auto mt-8 flex h-[58px] w-max items-center justify-center gap-2 rounded-2xl border p-2 backdrop-blur-md"
);

const Dock = React.forwardRef<HTMLDivElement, DockProps>(
  (
    {
      className,
      children,
      iconSize,
      iconMagnification,
      iconDistance,
      direction = "middle",
      ...props
    },
    ref
  ) => {
    // Mobile detection (SSR-safe)
    const isMobile = useIsMobileSSR();
    const mouseX = useMotionValue(Infinity);
    if (isMobile === null) return null; // Don't render until we know

    const resolvedIconSize =
      iconSize ?? (isMobile ? MOBILE_DEFAULT_SIZE : DEFAULT_SIZE);
    const resolvedIconMagnification =
      iconMagnification ??
      (isMobile ? MOBILE_DEFAULT_MAGNIFICATION : DEFAULT_MAGNIFICATION);
    const resolvedIconDistance =
      iconDistance ?? (isMobile ? MOBILE_DEFAULT_DISTANCE : DEFAULT_DISTANCE);

    const renderChildren = () => {
      return React.Children.map(children, (child) => {
        if (
          React.isValidElement<DockIconProps>(child) &&
          child.type === DockIcon
        ) {
          return React.cloneElement(child, {
            ...child.props,
            mouseX: mouseX,
            size: resolvedIconSize,
            magnification: resolvedIconMagnification,
            distance: resolvedIconDistance,
          });
        }
        return child;
      });
    };

    return (
      <motion.div
        ref={ref}
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        onTouchStart={(e) => {
          if (e.touches && e.touches.length > 0) {
            mouseX.set(e.touches[0].pageX);
          }
        }}
        onTouchEnd={() => mouseX.set(Infinity)}
        onTouchCancel={() => mouseX.set(Infinity)}
        {...props}
        className={cn(dockVariants({ className }), {
          "items-start": direction === "top",
          "items-center": direction === "middle",
          "items-end": direction === "bottom",
        })}
      >
        {renderChildren()}
      </motion.div>
    );
  }
);

Dock.displayName = "Dock";

export interface DockIconProps
  extends Omit<MotionProps & React.HTMLAttributes<HTMLDivElement>, "children"> {
  size?: number;
  magnification?: number;
  distance?: number;
  mouseX?: MotionValue<number>;
  className?: string;
  children?: React.ReactNode;
  props?: PropsWithChildren;
}

const DockIcon = ({
  size = DEFAULT_SIZE,
  magnification = DEFAULT_MAGNIFICATION,
  distance = DEFAULT_DISTANCE,
  mouseX,
  className,
  children,
  ...props
}: DockIconProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const padding = Math.max(6, size * 0.2);
  const defaultMouseX = useMotionValue(Infinity);

  const distanceCalc = useTransform(mouseX ?? defaultMouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? {
      x: 0,
      width: 0,
    };
    return val - bounds.x - bounds.width / 2;
  });

  const sizeTransform = useTransform(
    distanceCalc,
    [-distance, 0, distance],
    [size, magnification, size]
  );

  const scaleSize = useSpring(sizeTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  // Add touch end/cancel handlers to reset mouseX
  const handleTouchEnd = () => {
    if (mouseX) mouseX.set(Infinity);
  };

  return (
    <motion.div
      ref={ref}
      style={{ width: scaleSize, height: scaleSize, padding }}
      className={cn(
        "flex aspect-square cursor-pointer items-center justify-center rounded-full",
        className
      )}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      {...props}
    >
      {children}
    </motion.div>
  );
};

DockIcon.displayName = "DockIcon";

export { Dock, DockIcon, dockVariants };
