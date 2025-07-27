"use client";

import { AlertCircle, CheckCircle, Info, XCircle } from "lucide-react";
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
          background:
            "linear-gradient(135deg, hsl(var(--card)) 0%, hsl(var(--card)/0.95) 100%)",
          color: "hsl(var(--card-foreground))",
          border: "1px solid hsl(var(--border))",
          borderRadius: "16px",
          boxShadow:
            "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(255, 255, 255, 0.05)",
          padding: "20px",
          fontSize: "14px",
          lineHeight: "1.6",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        },
        className:
          "dark:bg-card/80 dark:text-card-foreground dark:border-border/50 dark:backdrop-blur-md",
      }}
      icons={{
        success: <CheckCircle className="h-5 w-5 text-green-500" />,
        error: <XCircle className="h-5 w-5 text-red-500" />,
        warning: <AlertCircle className="h-5 w-5 text-yellow-500" />,
        info: <Info className="h-5 w-5 text-blue-500" />,
      }}
    />
  );
};
