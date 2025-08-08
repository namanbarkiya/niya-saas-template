import { CodeIcon, PaletteIcon, ShieldIcon, ZapIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { BentoCard, BentoGrid } from "@/components/ui/magicui/bento-grid";
import { Marquee } from "@/components/ui/magicui/marquee";
import { cn } from "@/lib/utils";
import AnimatedBeamMultipleOutputDemo from "./animated-beam-demo";
import AnimatedListDemo from "./animated-list-demo";

const techStack = [
  {
    name: "Next.js 15",
    body: "Latest App Router with TypeScript support and optimized performance.",
  },
  {
    name: "Supabase",
    body: "Real-time database with authentication, storage, and edge functions.",
  },
  {
    name: "Tailwind CSS",
    body: "Utility-first CSS framework for rapid UI development and customization.",
  },
  {
    name: "Zustand",
    body: "Lightweight state management with TypeScript support and minimal boilerplate.",
  },
  {
    name: "React Query",
    body: "Powerful data fetching and caching library for server state management.",
  },
  {
    name: "Zod",
    body: "TypeScript-first schema validation for runtime type safety and error handling.",
  },
];

const features = [
  {
    Icon: CodeIcon,
    name: "Modern Tech Stack",
    description:
      "Built with Next.js 15, TypeScript, and cutting-edge tools for production-ready applications.",
    href: "#",
    cta: "View Tech Stack",
    className: "col-span-3 lg:col-span-1",
    background: (
      <Marquee
        pauseOnHover
        className="absolute top-10 [--duration:20s] [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] "
      >
        {techStack.map((tech, idx) => (
          <figure
            key={idx}
            className={cn(
              "relative w-32 cursor-pointer overflow-hidden rounded-xl border p-4",
              "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
              "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
              "transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none"
            )}
          >
            <div className="flex flex-row items-center gap-2">
              <div className="flex flex-col">
                <figcaption className="text-sm font-medium dark:text-white ">
                  {tech.name}
                </figcaption>
              </div>
            </div>
            <blockquote className="mt-2 text-xs">{tech.body}</blockquote>
          </figure>
        ))}
      </Marquee>
    ),
  },
  {
    Icon: ShieldIcon,
    name: "Authentication & Security",
    description:
      "Complete auth system with Supabase, protected routes, and role-based access control.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-2",
    background: (
      <AnimatedListDemo className="absolute right-2 top-4 h-[300px] w-full scale-75 border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-90" />
    ),
  },
  {
    Icon: ZapIcon,
    name: "State Management",
    description:
      "Optimized state management with Zustand and React Query for scalable applications.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-2",
    background: (
      <AnimatedBeamMultipleOutputDemo className="absolute right-2 top-4 h-[300px] border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105" />
    ),
  },
  {
    Icon: PaletteIcon,
    name: "Beautiful UI Components",
    description:
      "Modern UI components with Magic UI, Radix primitives, and Tailwind CSS styling.",
    className: "col-span-3 lg:col-span-1",
    href: "#",
    cta: "View Components",
    background: (
      <Calendar
        mode="single"
        selected={new Date(2022, 4, 11, 0, 0, 0)}
        className="absolute right-0 top-10 origin-top scale-75 rounded-md border transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] group-hover:scale-90"
      />
    ),
  },
];

export default function Features() {
  return (
    <section id="features">
      <BentoGrid className="gap-6">
        {features.map((feature, idx) => (
          <BentoCard key={idx} {...feature} />
        ))}
      </BentoGrid>
    </section>
  );
}
