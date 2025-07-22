import React from "react";
import Hero from "@/components/Hero";
import BentoDemo from "@/components/bentoGridComponent";

export default function LandingPage() {
    return (
        <div className="flex flex-col items-center justify-center max-w-screen-lg mx-auto">
            <Hero />
            <BentoDemo />
        </div>
    );
}
