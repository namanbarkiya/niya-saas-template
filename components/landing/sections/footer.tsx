import React from "react";
import { cn } from "@/lib/utils";

export default function Footer({ className }: { className?: string }) {
    return (
        <footer
            className={cn(
                "w-full border-t pt-8 pb-6 mt-16 flex flex-col items-center text-center text-gray-500 text-sm gap-2",
                className
            )}
        >
            <div>
                &copy; {new Date().getFullYear()} Your Company. All rights
                reserved.
            </div>
            <div className="flex gap-4 items-center justify-center">
                <a
                    href="https://github.com/namanbarkiya"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline hover:text-black transition-colors"
                >
                    GitHub
                </a>
                <span aria-hidden="true">·</span>
                <a
                    href="#"
                    className="hover:underline hover:text-black transition-colors"
                >
                    Back to top
                </a>
            </div>
        </footer>
    );
}
