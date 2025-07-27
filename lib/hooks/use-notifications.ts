import { useCallback } from "react";
import { useUIStore } from "@/lib/store/ui-store";
import { ErrorHandler } from "@/lib/utils/error-handler";

export const useNotifications = () => {
  const {
    showSuccess,
    showError,
    showWarning,
    showInfo,
    notifications,
    removeNotification,
    clearNotifications,
  } = useUIStore();

  // Notification methods that use the UI store
  const success = useCallback(
    (title: string, message?: string, duration?: number) => {
      showSuccess(title, message, duration);
    },
    [showSuccess]
  );

  const error = useCallback(
    (title: string, message?: string, duration?: number) => {
      showError(title, message, duration);
    },
    [showError]
  );

  const warning = useCallback(
    (title: string, message?: string, duration?: number) => {
      showWarning(title, message, duration);
    },
    [showWarning]
  );

  const info = useCallback(
    (title: string, message?: string, duration?: number) => {
      showInfo(title, message, duration);
    },
    [showInfo]
  );

  // Error handling method
  const handleError = useCallback((error: unknown, context?: string) => {
    ErrorHandler.handle(error, context);
  }, []);

  // Notification management
  const remove = useCallback(
    (id: string) => {
      removeNotification(id);
    },
    [removeNotification]
  );

  const clear = useCallback(() => {
    clearNotifications();
  }, [clearNotifications]);

  return {
    // Show notification methods
    success,
    error,
    warning,
    info,

    // Error handling
    handleError,

    // Notification management
    notifications,
    remove,
    clear,
  };
};
