"use client";

import React from "react";
import { AuroraText } from "@/components/landing/magicui/aurora-text";
import { InteractiveHoverButton } from "@/components/landing/magicui/interactive-hover-button";
import { AnimatedShinyText } from "@/components/landing/magicui/animated-shiny-text";
import { WordRotate } from "@/components/landing/magicui/word-rotate";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

export default function Hero() {
    return (
        <section className="relative flex min-h-screen md:min-h-[80vh] flex-col items-center justify-center px-2 py-8 md:px-4 md:py-24 overflow-hidden">
            <div className="flex flex-col items-center gap-6 w-full max-w-2xl mx-auto">
                <div className="z-10 flex items-center justify-center">
                    <div
                        className={cn(
                            "group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
                        )}
                    >
                        <AnimatedShinyText
                            className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400"
                            onClick={() =>
                                window.open(
                                    "https://github.com/namanbarkiya",
                                    "_blank"
                                )
                            }
                        >
                            <span>🚀 Built by Naman Barkiya</span>
                            <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
                        </AnimatedShinyText>
                    </div>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-center tracking-tighter">
                    The Ultimate <AuroraText>Next.js</AuroraText> Template for
                    Developers
                </h1>
                <div className="mt-2">
                    <WordRotate
                        words={[
                            "Production-ready with Supabase & TypeScript.",
                            "Modern authentication & state management.",
                            "Beautiful UI with Tailwind CSS & Magic UI.",
                            "Scalable architecture for AI startups.",
                            "Zero-config setup for rapid development.",
                        ]}
                        className="text-lg md:text-xl lg:text-2xl text-neutral-600 dark:text-neutral-300 font-medium min-h-[2.5rem]"
                        duration={2200}
                    />
                </div>
                <div className="mt-6 flex flex-col sm:flex-row gap-4">
                    <InteractiveHoverButton className="text-base px-8 py-3">
                        Get Template
                    </InteractiveHoverButton>
                    <InteractiveHoverButton
                        className="text-base px-8 py-3 bg-transparent border border-neutral-300 dark:border-neutral-700"
                        onClick={() =>
                            window.open(
                                "https://github.com/namanbarkiya/niya-saas-template",
                                "_blank"
                            )
                        }
                    >
                        View on GitHub
                    </InteractiveHoverButton>
                </div>
                <div className="mt-8 text-center text-sm text-neutral-500 dark:text-neutral-400">
                    <p>Trusted by developers worldwide • Free & Open Source</p>
                </div>
            </div>
        </section>
    );
}
