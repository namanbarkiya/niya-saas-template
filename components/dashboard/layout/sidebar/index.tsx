"use client";

import * as React from "react";
import {
  AudioWaveform,
  Bot,
  Command,
  Folder,
  GalleryVerticalEnd,
  SquareTerminal,
} from "lucide-react";
import { HistorySectionSidebar } from "@/components/dashboard/layout/sidebar/history-section";
import { MainSectionSidebar } from "@/components/dashboard/layout/sidebar/main-section";
import { TeamSwitcher } from "@/components/dashboard/layout/team-switcher";
import { NavUser } from "@/components/dashboard/layout/user-popover";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Niya Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Crazy LLP.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Chat IO.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Playground",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Projects",
      url: "#",
      icon: Folder,
      items: [
        {
          title: "Project 1",
          url: "#",
        },
        {
          title: "Project 2",
          url: "#",
        },
        {
          title: "Project 3",
          url: "#",
        },
        {
          title: "Project 4",
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
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
