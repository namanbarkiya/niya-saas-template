import React from "react";
import { SectionHeader } from "@/components/landing/section-header";
import CTA from "@/components/landing/sections/cta";
import Features from "@/components/landing/sections/features";
import Footer from "@/components/landing/sections/footer";
import Hero from "@/components/landing/sections/hero";
import Navbar from "@/components/landing/sections/navbar";
import Pricing from "@/components/landing/sections/pricing";
import Stats from "@/components/landing/sections/stats";
import Testimonials from "@/components/landing/sections/testimonials";
import TweetGallery from "@/components/landing/sections/tweet-gallery";
import { ScrollProgress } from "@/components/ui/magicui/scroll-progress";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";

export default function LandingPage() {
  return (
    <div className="min-h-screen relative">
      {/* Global gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50/60 via-indigo-50/40 to-purple-50/30 dark:from-blue-950/25 dark:via-indigo-950/15 dark:to-purple-950/10" />

      {/* Content wrapper */}
      <div className="relative z-10">
        <Navbar />
        <ScrollProgress />

        {/* Hero Section */}
        <RevealOnScroll direction="up" delay={200}>
          <Hero />
        </RevealOnScroll>

        {/* Stats Section */}
        <div className="py-20">
          <RevealOnScroll direction="up" delay={200}>
            <Stats />
          </RevealOnScroll>
        </div>

        {/* Features Section */}
        <div className="py-20">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8">
            <RevealOnScroll direction="up" delay={100}>
              <SectionHeader
                title="Powerful features for modern development"
                subtitle="Built with modern technologies and best practices to help you ship faster and scale effortlessly."
              />
            </RevealOnScroll>
            <RevealOnScroll direction="up" delay={300}>
              <Features />
            </RevealOnScroll>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="py-20">
          <RevealOnScroll direction="up" delay={200}>
            <Testimonials />
          </RevealOnScroll>
        </div>

        {/* Pricing Section */}
        <div className="py-20">
          <RevealOnScroll direction="up" delay={200}>
            <Pricing />
          </RevealOnScroll>
        </div>

        {/* Social Proof Section */}
        <div className="py-20">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8">
            <RevealOnScroll direction="up" delay={100}>
              <SectionHeader
                title="Join the community"
                subtitle="See what developers are saying about our template on social media."
              />
            </RevealOnScroll>
            <RevealOnScroll direction="up" delay={300}>
              <TweetGallery />
            </RevealOnScroll>
          </div>
        </div>

        {/* Final CTA */}
        <RevealOnScroll direction="up" delay={200}>
          <CTA />
        </RevealOnScroll>

        <Footer />
      </div>
    </div>
  );
}
