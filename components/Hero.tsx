import React from "react";
import { AuroraText } from "@/components/magicui/aurora-text";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import { WordRotate } from "@/components/magicui/word-rotate";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

export default function Hero() {
    return (
        <section className="relative flex min-h-screen md:min-h-[80vh] flex-col items-center justify-center px-2 py-8 md:px-4 md:py-24 overflow-hidden">
            {/* <BlurredCircleBg
                size="h-[32rem] w-[32rem]"
                position="left-1/2 top-1/3 -translate-x-1/5 -translate-y-1/2"
                colors="bg-gradient-to-br from-pink-100/20 via-blue-100/10 to-white/0"
                blur="blur-3xl"
            />
            <BlurredWhiteCircleBg
                size="h-40 w-40"
                position="top-10 left-10"
                blur="blur-2xl"
                zIndex="-z-20"
            />
            <BlurredWhiteCircleBg
                size="h-32 w-32"
                position="bottom-10 right-20"
                blur="blur-2xl"
                zIndex="-z-20"
            />
            <BlurredWhiteCircleBg
                size="h-24 w-24"
                position="top-1/2 right-10 -translate-y-1/2"
                blur="blur-xl"
                zIndex="-z-20"
            /> */}
            <div className="flex flex-col items-center gap-6 w-full max-w-2xl mx-auto">
                <div className="z-10 flex items-center justify-center">
                    <div
                        className={cn(
                            "group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
                        )}
                    >
                        <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
                            <span>✨ Introducing Magic UI</span>
                            <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
                        </AnimatedShinyText>
                    </div>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-center tracking-tighter">
                    Elevate your workflow with <AuroraText>AI</AuroraText>{" "}
                    automation
                </h1>
                <div className="mt-2">
                    <WordRotate
                        words={[
                            "Automate tasks instantly.",
                            "Generate insights with AI.",
                            "Seamless SaaS integration.",
                            "Boost productivity effortlessly.",
                        ]}
                        className="text-lg md:text-xl lg:text-2xl text-neutral-600 dark:text-neutral-300 font-medium min-h-[2.5rem]"
                        duration={2200}
                    />
                </div>
                <div className="mt-6">
                    <InteractiveHoverButton className="text-base px-8 py-3">
                        Get Started
                    </InteractiveHoverButton>
                </div>
            </div>
            {/* <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute left-1/2 top-1/3 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-pink-100/40 via-blue-100/30 to-white/0 blur-3xl" />
            </div> */}
        </section>
    );
}
