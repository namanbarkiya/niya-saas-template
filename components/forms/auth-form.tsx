"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormField, FormSubmit } from "@/components/forms";
import {
    loginSchema,
    signupSchema,
    LoginFormData,
    SignupFormData,
} from "@/lib/validations/auth";
import { useLogin, useSignup } from "@/lib/query/hooks/auth";
// import { useErrorHandler } from "@/lib/hooks/use-error-handler";

interface AuthFormProps {
    mode: "login" | "signup";
    className?: string;
    onSuccess?: () => void;
}

export const AuthForm: React.FC<AuthFormProps> = ({
    mode,
    className,
    onSuccess,
}) => {
    const loginMutation = useLogin();
    const signupMutation = useSignup();
    // const { handleError } = useErrorHandler();

    const isLogin = mode === "login";
    const schema = isLogin ? loginSchema : signupSchema;
    const mutation = isLogin ? loginMutation : signupMutation;

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormData | SignupFormData>({
        resolver: zodResolver(schema),
        mode: "onChange",
    });

    const onSubmit = async (data: LoginFormData | SignupFormData) => {
        try {
            if (isLogin) {
                await loginMutation.mutateAsync(data as LoginFormData);
            } else {
                await signupMutation.mutateAsync(data as SignupFormData);
            }
            onSuccess?.();
        } catch (error) {
            // Error handling is done in the mutation hooks via ErrorHandler
            // handleError(error, `auth-form-${mode}`);
            console.error("Auth error:", error);
        }
    };

    const isLoading = isSubmitting || mutation.isPending;

    return (
        <form
            className={cn("flex flex-col gap-6", className)}
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">
                    {isLogin ? "Login to your account" : "Create your account"}
                </h1>
                <p className="text-balance text-sm text-muted-foreground">
                    {isLogin
                        ? "Enter your email below to login to your account"
                        : "Enter your details below to create your account"}
                </p>
            </div>

            <div className="grid gap-6">
                {!isLogin && (
                    <FormField
                        label="Name"
                        error={
                            (errors as Record<string, { message?: string }>)
                                .name?.message
                        }
                        required
                    >
                        <Input
                            {...register("name" as keyof SignupFormData)}
                            type="text"
                            placeholder="John Doe"
                            autoComplete="name"
                        />
                    </FormField>
                )}

                <FormField label="Email" error={errors.email?.message} required>
                    <Input
                        {...register("email")}
                        type="email"
                        placeholder="m@example.com"
                        autoComplete="username"
                    />
                </FormField>

                <FormField
                    label="Password"
                    error={errors.password?.message}
                    required
                >
                    <div className="space-y-2">
                        <Input
                            {...register("password")}
                            type="password"
                            autoComplete={
                                isLogin ? "current-password" : "new-password"
                            }
                        />
                        {isLogin && (
                            <div className="flex justify-end">
                                <a
                                    href="#"
                                    className="text-sm underline-offset-4 hover:underline"
                                >
                                    Forgot your password?
                                </a>
                            </div>
                        )}
                    </div>
                </FormField>

                {!isLogin && (
                    <FormField
                        label="Confirm Password"
                        error={
                            (errors as Record<string, { message?: string }>)
                                .confirmPassword?.message
                        }
                        required
                    >
                        <Input
                            {...register(
                                "confirmPassword" as keyof SignupFormData
                            )}
                            type="password"
                            autoComplete="new-password"
                        />
                    </FormField>
                )}

                <FormSubmit isLoading={isLoading}>
                    {isLogin ? "Login" : "Sign Up"}
                </FormSubmit>

                <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                    <span className="relative z-10 bg-background px-2 text-muted-foreground">
                        Or continue with
                    </span>
                </div>

                <Button variant="outline" className="w-full" type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path
                            d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                            fill="currentColor"
                        />
                    </svg>
                    {isLogin ? "Login" : "Sign up"} with GitHub
                </Button>
            </div>

            <div className="text-center text-sm">
                {isLogin ? (
                    <>
                        Don&apos;t have an account?{" "}
                        <a
                            href="/signup"
                            className="underline underline-offset-4"
                        >
                            Sign up
                        </a>
                    </>
                ) : (
                    <>
                        Already have an account?{" "}
                        <a
                            href="/login"
                            className="underline underline-offset-4"
                        >
                            Login
                        </a>
                    </>
                )}
            </div>
        </form>
    );
};
