import React from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FormSubmitProps {
  isLoading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

export const FormSubmit: React.FC<FormSubmitProps> = ({
  isLoading = false,
  disabled = false,
  children,
  className,
  variant = "default",
  size = "default",
}) => {
  return (
    <Button
      type="submit"
      disabled={disabled || isLoading}
      className={cn("w-full", className)}
      variant={variant}
      size={size}
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </Button>
  );
};
