import React from "react";
import Hero from "@/components/landing/sections/hero";
import Features from "@/components/landing/sections/features";
import TweetGallery from "@/components/landing/sections/tweet-gallery";
import { SectionHeader } from "@/components/landing/section-header";
import { ScrollProgress } from "@/components/landing/magicui/scroll-progress";
import Navbar from "@/components/landing/sections/navbar";
import Footer from "@/components/landing/sections/footer";

export default function LandingPage() {
    return (
        <div className="flex flex-col items-center justify-center max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8">
            <Navbar />
            <ScrollProgress />
            <Hero />
            <SectionHeader title="Features for you" className="mt-0!" />
            <Features />
            <SectionHeader title="What people are saying" />
            <TweetGallery />
            <Footer />
        </div>
    );
}
