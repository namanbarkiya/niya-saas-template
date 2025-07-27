import React from "react";
import { SectionHeader } from "@/components/landing/section-header";
import Features from "@/components/landing/sections/features";
import Footer from "@/components/landing/sections/footer";
import Hero from "@/components/landing/sections/hero";
import Navbar from "@/components/landing/sections/navbar";
import TweetGallery from "@/components/landing/sections/tweet-gallery";
import { ScrollProgress } from "@/components/ui/magicui/scroll-progress";

export default function LandingPage() {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8">
        <ScrollProgress />
        <Hero />
        <SectionHeader title="Features for you" className="mt-0!" />
        <Features />
        <SectionHeader title="What people are saying" />
        <TweetGallery />
      </div>
      <Footer />
    </div>
  );
}
