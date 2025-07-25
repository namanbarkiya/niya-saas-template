import Image from "next/image";
import { Button } from "@/components/ui/button";
import { AuroraText } from "@/components/landing/magicui/aurora-text";

import { login, signup } from "./actions";

export default function LoginPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4">
            <div className="w-full max-w-sm rounded-2xl bg-card shadow-xl border border-border p-8 flex flex-col items-center gap-8 dark:bg-neutral-900/80 dark:border-white/10">
                <h2 className="text-2xl font-bold tracking-tight text-foreground text-center">
                    Sign in to your account
                </h2>
                <form className="w-full space-y-6">
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-foreground"
                        >
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                autoComplete="email"
                                className="block w-full rounded-md bg-background px-3 py-1.5 text-base text-foreground border border-input placeholder:text-muted-foreground focus:outline-2 focus:outline-ring/50"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-foreground"
                            >
                                Password
                            </label>
                            <div className="text-sm">
                                <a
                                    href="#"
                                    className="font-semibold text-primary hover:underline"
                                >
                                    Forgot password?
                                </a>
                            </div>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                autoComplete="current-password"
                                className="block w-full rounded-md bg-background px-3 py-1.5 text-base text-foreground border border-input placeholder:text-muted-foreground focus:outline-2 focus:outline-ring/50"
                            />
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <button
                            type="submit"
                            formAction={login}
                            className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold text-primary-foreground shadow-xs hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                        >
                            Sign in
                        </button>
                        <button
                            type="submit"
                            formAction={signup}
                            className="flex w-full justify-center rounded-md border border-input bg-background px-3 py-1.5 text-sm font-semibold text-foreground shadow-xs hover:bg-accent hover:text-accent-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                        >
                            Sign up
                        </button>
                    </div>
                </form>
                <p className="mt-6 text-center text-sm text-muted-foreground">
                    Not a member?{" "}
                    <a
                        href="#"
                        className="font-semibold text-primary hover:underline"
                    >
                        Start a 14 day free trial
                    </a>
                </p>
            </div>
        </div>
    );
}
