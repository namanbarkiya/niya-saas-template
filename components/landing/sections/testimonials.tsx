"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Marquee } from "@/components/ui/magicui/marquee";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    name: "Sarah Chen",
    handle: "@sarahdev",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face",
    content:
      "This template saved me weeks of setup time. The authentication flow is seamless and the code quality is outstanding.",
    role: "Frontend Developer",
  },
  {
    name: "Alex Rodriguez",
    handle: "@alexbuilds",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    content:
      "Perfect for rapid prototyping. The TypeScript setup and component library made development a breeze.",
    role: "Full Stack Engineer",
  },
  {
    name: "Maya Patel",
    handle: "@mayacodes",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    content:
      "The best Next.js template I've used. Clean architecture, modern patterns, and excellent documentation.",
    role: "Tech Lead",
  },
  {
    name: "Jordan Kim",
    handle: "@jordantech",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    content:
      "Incredible attention to detail. The UI components are beautiful and the state management is perfectly implemented.",
    role: "Product Engineer",
  },
  {
    name: "Emma Thompson",
    handle: "@emmacodes",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    content:
      "This template is a game-changer. Production-ready from day one with all the modern tooling you need.",
    role: "Senior Developer",
  },
  {
    name: "David Park",
    handle: "@davidbuilds",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    content:
      "Outstanding template with excellent TypeScript support. The Supabase integration is flawless.",
    role: "Software Architect",
  },
];

function TestimonialCard({
  testimonial,
}: {
  testimonial: (typeof testimonials)[0];
}) {
  return (
    <Card
      className={cn(
        "w-80 h-48 p-6 mx-3",
        "bg-white/30 dark:bg-white/5",
        "border border-white/20 dark:border-white/10",
        "shadow-lg shadow-black/5 dark:shadow-black/20",
        "hover:shadow-xl hover:shadow-black/8 dark:hover:shadow-black/30 hover:scale-[1.02] transition-all duration-500",
        "backdrop-blur-sm backdrop-saturate-150",
        "hover:backdrop-blur-md",
        "relative"
      )}
    >
      <CardContent className="p-0 h-full flex flex-col justify-between relative z-10">
        <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed mb-4">
          &ldquo;{testimonial.content}&rdquo;
        </p>
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
            <AvatarFallback>
              {testimonial.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-semibold text-sm text-neutral-900 dark:text-neutral-100">
              {testimonial.name}
            </div>
            <div className="text-xs text-neutral-500 dark:text-neutral-400">
              {testimonial.role} • {testimonial.handle}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Testimonials() {
  return (
    <section className="px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
          Loved by developers worldwide
        </h2>
        <p className="text-base text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
          Join thousands of developers who are building amazing applications
          with our template.
        </p>
      </div>

      <div className="relative">
        <Marquee pauseOnHover className="[--duration:40s]">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </Marquee>

        {/* Gradient overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />
      </div>
    </section>
  );
}
