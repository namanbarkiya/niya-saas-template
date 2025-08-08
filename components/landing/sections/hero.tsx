"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { useAuth } from "@/components/providers/auth-provider";
import { AnimatedShinyText } from "@/components/ui/magicui/animated-shiny-text";
import { AuroraText } from "@/components/ui/magicui/aurora-text";
import { InteractiveHoverButton } from "@/components/ui/magicui/interactive-hover-button";
import { WordRotate } from "@/components/ui/magicui/word-rotate";
import { cn } from "@/lib/utils";

export default function Hero() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const handleAuthButtonClick = () => {
    if (isAuthenticated) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  };

  return (
    <section className="relative flex min-h-screen md:min-h-[90vh] flex-col items-center justify-center px-2 py-8 md:px-4 md:py-24 overflow-hidden">
      {/* Animated background orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-blue-400/15 to-purple-400/15 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/15 to-pink-400/15 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="relative z-10 flex flex-col items-center gap-8 w-full max-w-4xl mx-auto">
        {" "}
        <div className="z-10 flex items-center justify-center">
          {" "}
          <div
            className={cn(
              "group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
            )}
          >
            {" "}
            <AnimatedShinyText
              className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400"
              onClick={() =>
                window.open("https://github.com/namanbarkiya", "_blank")
              }
            >
              {" "}
              <span>🚀 Built by Naman Barkiya</span>{" "}
              <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />{" "}
            </AnimatedShinyText>{" "}
          </div>{" "}
        </div>{" "}
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-center tracking-tight leading-tight">
          The Ultimate <AuroraText>Next.js</AuroraText> Template for Developers
        </h1>
        <div className="mt-2">
          {" "}
          <WordRotate
            words={[
              "Production-ready with Supabase & TypeScript.",
              "Modern authentication & state management.",
              "Beautiful UI with Tailwind CSS & Magic UI.",
              "Scalable architecture for AI startups.",
              "Zero-config setup for rapid development.",
            ]}
            className="text-lg text-center md:text-xl text-neutral-600 dark:text-neutral-300 font-normal min-h-[2rem]"
            duration={2200}
          />{" "}
        </div>{" "}
        <div className="mt-6 flex flex-col sm:flex-row gap-3 w-fit max-w-md mx-auto">
          <InteractiveHoverButton onClick={handleAuthButtonClick}>
            {isAuthenticated ? "Go to Dashboard" : "Get Started"}
          </InteractiveHoverButton>
          <InteractiveHoverButton
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
        <div className="mt-6 text-center text-sm text-neutral-500 dark:text-neutral-400">
          <p>Trusted by developers worldwide • Free & Open Source</p>
        </div>
      </div>
    </section>
  );
}
