import { useUIStore } from "@/lib/store/ui-store";

export interface AppError {
  message: string;
  code?: string;
  status?: number;
  details?: unknown;
}

export class ErrorHandler {
  /**
   * Handle any error and show appropriate notification
   */
  static handle(error: unknown, context?: string): void {
    console.error(`Error in ${context || "unknown context"}:`, error);

    // Extract error message and details
    const errorInfo = this.extractErrorInfo(error);

    // Show appropriate notification based on error type
    this.showErrorNotification(errorInfo);
  }

  /**
   * Extract structured error information from various error types
   */
  private static extractErrorInfo(error: unknown): AppError {
    const errorObj = error as {
      message?: string;
      status?: number;
      code?: string;
      details?: unknown;
      name?: string;
    };

    // Handle Supabase errors
    if (errorObj?.message && errorObj?.status) {
      return {
        message: errorObj.message,
        status: errorObj.status,
        code: errorObj.code,
        details: errorObj.details,
      };
    }

    // Handle network errors
    if (
      errorObj?.name === "NetworkError" ||
      errorObj?.message?.includes("network")
    ) {
      return {
        message: "Network error. Please check your connection and try again.",
        code: "NETWORK_ERROR",
        status: 0,
      };
    }

    // Handle authentication errors
    if (errorObj?.message?.includes("Invalid login credentials")) {
      return {
        message: "Invalid email or password. Please try again.",
        code: "AUTH_INVALID_CREDENTIALS",
        status: 401,
      };
    }

    if (errorObj?.message?.includes("Email not confirmed")) {
      return {
        message:
          "Please check your email and confirm your account before logging in.",
        code: "AUTH_EMAIL_NOT_CONFIRMED",
        status: 401,
      };
    }

    if (errorObj?.message?.includes("User already registered")) {
      return {
        message:
          "An account with this email already exists. Please try logging in instead.",
        code: "AUTH_USER_EXISTS",
        status: 400,
      };
    }

    if (errorObj?.message?.includes("Password should be at least")) {
      return {
        message: "Password must be at least 6 characters long.",
        code: "AUTH_WEAK_PASSWORD",
        status: 400,
      };
    }

    // Handle validation errors
    if (errorObj?.name === "ZodError") {
      const zodError = error as { errors?: Array<{ message?: string }> };
      const firstError = zodError.errors?.[0];
      return {
        message:
          firstError?.message || "Please check your input and try again.",
        code: "VALIDATION_ERROR",
        status: 400,
        details: zodError.errors,
      };
    }

    // Handle generic errors
    if (errorObj?.message) {
      return {
        message: errorObj.message,
        code: errorObj.code || "UNKNOWN_ERROR",
        status: errorObj.status || 500,
      };
    }

    // Fallback for unknown errors
    return {
      message: "Something went wrong. Please try again.",
      code: "UNKNOWN_ERROR",
      status: 500,
    };
  }

  /**
   * Show appropriate notification based on error type
   */
  private static showErrorNotification(errorInfo: AppError): void {
    const { message, status, code } = errorInfo;
    const { showError, showWarning } = useUIStore.getState();

    // Don't show notification for validation errors (handled by form components)
    if (code === "VALIDATION_ERROR") {
      return;
    }

    // Customize notification based on error type
    switch (code) {
      case "AUTH_INVALID_CREDENTIALS":
        showError("Login Failed", message, 5000);
        break;

      case "AUTH_EMAIL_NOT_CONFIRMED":
        showWarning("Email Not Confirmed", message, 8000);
        break;

      case "AUTH_USER_EXISTS":
        showWarning("Account Exists", message, 6000);
        break;

      case "NETWORK_ERROR":
        showError("Connection Error", message, 8000);
        break;

      default:
        if (status && status >= 500) {
          console.log("Server Error", message, errorInfo);
          showError(
            "Server Error",
            "Something went wrong on our end. Please try again later.",
            8000
          );
        } else {
          showError("Error", message, 5000);
        }
        break;
    }
  }
}
