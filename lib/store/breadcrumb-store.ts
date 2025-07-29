import { persist } from "zustand/middleware";
import { create } from "zustand";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export interface BreadcrumbState {
  items: BreadcrumbItem[];
  isLoading: boolean;
}

export interface BreadcrumbStore extends BreadcrumbState {
  // Actions
  setBreadcrumbs: (items: BreadcrumbItem[]) => void;
  addBreadcrumb: (item: BreadcrumbItem) => void;
  removeBreadcrumb: (index: number) => void;
  clearBreadcrumbs: () => void;
  setLoading: (isLoading: boolean) => void;

  // Auto-generation based on route
  generateBreadcrumbs: (pathname: string) => void;
}

// Route to breadcrumb mapping
const routeConfig: Record<string, BreadcrumbItem[]> = {
  "/dashboard": [{ label: "Dashboard", href: "/dashboard" }],
  "/dashboard/account": [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Account", href: "/dashboard/account" },
  ],
  "/dashboard/settings": [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Settings", href: "/dashboard/settings" },
  ],
  "/dashboard/projects": [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Projects", href: "/dashboard/projects" },
  ],
  "/dashboard/analytics": [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Analytics", href: "/dashboard/analytics" },
  ],
  "/dashboard/billing": [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Billing", href: "/dashboard/billing" },
  ],
  "/dashboard/team": [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Team", href: "/dashboard/team" },
  ],
  "/dashboard/integrations": [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Integrations", href: "/dashboard/integrations" },
  ],
  "/dashboard/notifications": [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Notifications", href: "/dashboard/notifications" },
  ],
  "/dashboard/security": [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Security", href: "/dashboard/security" },
  ],
  "/dashboard/help": [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Help", href: "/dashboard/help" },
  ],
};

// Dynamic route patterns for parameterized routes
const dynamicRoutePatterns: Array<{
  pattern: RegExp;
  generateItems: (pathname: string) => BreadcrumbItem[];
}> = [
  // Project detail pages
  {
    pattern: /^\/dashboard\/projects\/([^\/]+)$/,
    generateItems: (pathname) => {
      const projectId = pathname.split("/").pop() || "Unknown";
      return [
        { label: "Dashboard", href: "/dashboard" },
        { label: "Projects", href: "/dashboard/projects" },
        { label: `Project ${projectId}`, href: pathname },
      ];
    },
  },
  // User profile pages
  {
    pattern: /^\/dashboard\/users\/([^\/]+)$/,
    generateItems: (pathname) => {
      const userId = pathname.split("/").pop() || "Unknown";
      return [
        { label: "Dashboard", href: "/dashboard" },
        { label: "Users", href: "/dashboard/users" },
        { label: `User ${userId}`, href: pathname },
      ];
    },
  },
  // Settings sub-pages
  {
    pattern: /^\/dashboard\/settings\/([^\/]+)$/,
    generateItems: (pathname) => {
      const settingType = pathname.split("/").pop() || "Unknown";
      const settingLabel =
        settingType.charAt(0).toUpperCase() + settingType.slice(1);
      return [
        { label: "Dashboard", href: "/dashboard" },
        { label: "Settings", href: "/dashboard/settings" },
        { label: settingLabel, href: pathname },
      ];
    },
  },
];

export const useBreadcrumbStore = create<BreadcrumbStore>()(
  persist(
    (set, get) => ({
      // Initial state
      items: [],
      isLoading: false,

      // Actions
      setBreadcrumbs: (items) => set({ items }),
      addBreadcrumb: (item) =>
        set((state) => ({
          items: [...state.items, item],
        })),
      removeBreadcrumb: (index) =>
        set((state) => ({
          items: state.items.filter((_, i) => i !== index),
        })),
      clearBreadcrumbs: () => set({ items: [] }),
      setLoading: (isLoading) => set({ isLoading }),

      // Auto-generation based on route
      generateBreadcrumbs: (pathname: string) => {
        // Check for exact matches first
        if (routeConfig[pathname]) {
          set({ items: routeConfig[pathname] });
          return;
        }

        // Check dynamic route patterns
        for (const { pattern, generateItems } of dynamicRoutePatterns) {
          if (pattern.test(pathname)) {
            set({ items: generateItems(pathname) });
            return;
          }
        }

        // Fallback: generate breadcrumbs from path segments
        const segments = pathname.split("/").filter(Boolean);
        const items: BreadcrumbItem[] = [];

        let currentPath = "";
        segments.forEach((segment, index) => {
          currentPath += `/${segment}`;
          const label = segment.charAt(0).toUpperCase() + segment.slice(1);
          items.push({
            label,
            href: index === segments.length - 1 ? undefined : currentPath,
          });
        });

        set({ items });
      },
    }),
    {
      name: "breadcrumb-store",
      partialize: (state) => ({
        items: state.items,
      }),
    }
  )
);
