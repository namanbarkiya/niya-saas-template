import { useCallback } from "react";
import { ErrorHandler } from "@/lib/utils/error-handler";

export const useErrorHandler = () => {
  const handleError = useCallback((error: unknown, context?: string) => {
    ErrorHandler.handle(error, context);
  }, []);

  const showSuccess = useCallback((message: string, description?: string) => {
    ErrorHandler.showSuccess(message, description);
  }, []);

  const showInfo = useCallback((message: string, description?: string) => {
    ErrorHandler.showInfo(message, description);
  }, []);

  const showWarning = useCallback((message: string, description?: string) => {
    ErrorHandler.showWarning(message, description);
  }, []);

  return {
    handleError,
    showSuccess,
    showInfo,
    showWarning,
  };
};
