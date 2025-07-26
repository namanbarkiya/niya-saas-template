import { toast } from "sonner";

export interface AppError {
    message: string;
    code?: string;
    status?: number;
    details?: any;
}

export class ErrorHandler {
    static handle(error: any, context?: string): void {
        console.error(`Error in ${context || "unknown context"}:`, error);

        // Extract error message and details
        const errorInfo = this.extractErrorInfo(error);

        // Show appropriate toast based on error type
        this.showErrorToast(errorInfo);
    }

    private static extractErrorInfo(error: any): AppError {
        // Handle Supabase errors
        if (error?.message && error?.status) {
            return {
                message: error.message,
                status: error.status,
                code: error.code,
                details: error.details,
            };
        }

        // Handle network errors
        if (
            error?.name === "NetworkError" ||
            error?.message?.includes("network")
        ) {
            return {
                message:
                    "Network error. Please check your connection and try again.",
                code: "NETWORK_ERROR",
                status: 0,
            };
        }

        // Handle authentication errors
        if (error?.message?.includes("Invalid login credentials")) {
            return {
                message: "Invalid email or password. Please try again.",
                code: "AUTH_INVALID_CREDENTIALS",
                status: 401,
            };
        }

        if (error?.message?.includes("Email not confirmed")) {
            return {
                message:
                    "Please check your email and confirm your account before logging in.",
                code: "AUTH_EMAIL_NOT_CONFIRMED",
                status: 401,
            };
        }

        if (error?.message?.includes("User already registered")) {
            return {
                message:
                    "An account with this email already exists. Please try logging in instead.",
                code: "AUTH_USER_EXISTS",
                status: 400,
            };
        }

        if (error?.message?.includes("Password should be at least")) {
            return {
                message: "Password must be at least 6 characters long.",
                code: "AUTH_WEAK_PASSWORD",
                status: 400,
            };
        }

        // Handle validation errors
        if (error?.name === "ZodError") {
            const firstError = error.errors?.[0];
            return {
                message:
                    firstError?.message ||
                    "Please check your input and try again.",
                code: "VALIDATION_ERROR",
                status: 400,
                details: error.errors,
            };
        }

        // Handle generic errors
        if (error?.message) {
            return {
                message: error.message,
                code: error.code || "UNKNOWN_ERROR",
                status: error.status || 500,
            };
        }

        // Fallback for unknown errors
        return {
            message: "Something went wrong. Please try again.",
            code: "UNKNOWN_ERROR",
            status: 500,
        };
    }

    private static showErrorToast(errorInfo: AppError): void {
        const { message, status, code } = errorInfo;

        // Don't show toast for validation errors (handled by form components)
        if (code === "VALIDATION_ERROR") {
            return;
        }

        // Customize toast based on error type
        switch (code) {
            case "AUTH_INVALID_CREDENTIALS":
                toast.error("Login Failed", {
                    description: message,
                    duration: 5000,
                });
                break;

            case "AUTH_EMAIL_NOT_CONFIRMED":
                toast.warning("Email Not Confirmed", {
                    description: message,
                    duration: 8000,
                });
                break;

            case "AUTH_USER_EXISTS":
                toast.warning("Account Exists", {
                    description: message,
                    duration: 6000,
                });
                break;

            case "NETWORK_ERROR":
                toast.error("Connection Error", {
                    description: message,
                    duration: 8000,
                });
                break;

            default:
                if (status && status >= 500) {
                    toast.error("Server Error", {
                        description:
                            "Something went wrong on our end. Please try again later.",
                        duration: 8000,
                    });
                } else {
                    toast.error("Error", {
                        description: message,
                        duration: 5000,
                    });
                }
                break;
        }
    }

    // Success toast helper
    static showSuccess(message: string, description?: string): void {
        toast.success(message, {
            description,
            duration: 4000,
        });
    }

    // Info toast helper
    static showInfo(message: string, description?: string): void {
        toast.info(message, {
            description,
            duration: 4000,
        });
    }

    // Warning toast helper
    static showWarning(message: string, description?: string): void {
        toast.warning(message, {
            description,
            duration: 6000,
        });
    }
}
