"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Code,
  Command,
  Database,
  Folder,
  GalleryVerticalEnd,
  Palette,
  Shield,
  SquareTerminal,
  Zap,
} from "lucide-react";
import { HistorySectionSidebar } from "@/components/dashboard/layout/sidebar/history-section";
import { MainSectionSidebar } from "@/components/dashboard/layout/sidebar/main-section";
import { TeamSwitcher } from "@/components/dashboard/layout/team-switcher";
import { UserPopover } from "@/components/dashboard/layout/user-popover";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  teams: [
    {
      name: "Niya Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Crazy LLP",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Chat IO",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Overview",
          url: "/dashboard",
        },
        {
          title: "Account",
          url: "/dashboard/account",
        },
      ],
    },
    {
      title: "Documentation",
      url: "/dashboard/docs",
      icon: BookOpen,
      items: [
        {
          title: "Overview",
          url: "/dashboard/docs",
        },
        {
          title: "Hooks & Utilities",
          url: "/dashboard/docs/hooks",
        },
        {
          title: "State Management",
          url: "/dashboard/docs/state",
        },
        {
          title: "UI Components",
          url: "/dashboard/docs/components",
        },
        {
          title: "Authentication",
          url: "/dashboard/docs/auth",
        },
        {
          title: "Error Handling",
          url: "/dashboard/docs/errors",
        },
      ],
    },
    {
      title: "Components",
      url: "#",
      icon: Palette,
      items: [
        {
          title: "Breadcrumbs",
          url: "#",
        },
        {
          title: "Notifications",
          url: "#",
        },
        {
          title: "Forms",
          url: "#",
        },
        {
          title: "Layouts",
          url: "#",
        },
      ],
    },
  ],
  history: [
    {
      name: "how to create a router in nextjs",
      url: "#",
    },
    {
      name: "what is the best way to learn magic",
      url: "#",
    },
    {
      name: "how to make someone believe in you",
      url: "#",
    },
    {
      name: "top 10 best places to visit in the world",
      url: "#",
    },
    {
      name: "If I was a cat, how would I live my life?",
      url: "#",
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <MainSectionSidebar items={data.navMain} />
        <HistorySectionSidebar history={data.history} />
      </SidebarContent>
      <SidebarFooter>
        <UserPopover />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
