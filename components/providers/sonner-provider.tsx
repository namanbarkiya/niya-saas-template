"use client";

import { Toaster } from "sonner";

export const SonnerProvider = () => {
  return (
    <Toaster
      position="bottom-right"
      expand={true}
      richColors
      closeButton
      duration={4000}
      toastOptions={{
        style: {
          background: "hsl(var(--background))",
          color: "hsl(var(--foreground))",
          border: "1px solid hsl(var(--border))",
        },
        className: "dark:bg-background dark:text-foreground dark:border-border",
      }}
    />
  );
};
