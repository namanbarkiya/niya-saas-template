import React from "react";
import Hero from "@/components/Hero";
import BentoDemo from "@/components/bentoGridComponent";
import { SectionHeader } from "@/components/ui/SectionHeader";

export default function LandingPage() {
    return (
        <div className="flex flex-col items-center justify-center max-w-screen-lg mx-auto px-4 sm:px-6 md:px-8">
            <Hero />
            <SectionHeader title="Features for you" className="my-16" />
            <BentoDemo />
        </div>
    );
}
