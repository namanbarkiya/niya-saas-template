import { useBreadcrumbStore } from "@/lib/store/breadcrumb-store";
import { BreadcrumbItem } from "@/lib/store/breadcrumb-store";

export function useBreadcrumbs() {
  const {
    items,
    isLoading,
    setBreadcrumbs,
    addBreadcrumb,
    removeBreadcrumb,
    clearBreadcrumbs,
    setLoading,
    generateBreadcrumbs,
  } = useBreadcrumbStore();

  return {
    // State
    breadcrumbs: items,
    isLoading,

    // Actions
    setBreadcrumbs,
    addBreadcrumb,
    removeBreadcrumb,
    clearBreadcrumbs,
    setLoading,
    generateBreadcrumbs,

    // Convenience methods
    setCustomBreadcrumbs: (items: BreadcrumbItem[]) => {
      setBreadcrumbs(items);
    },

    // Helper for setting breadcrumbs with a custom title
    setPageTitle: (title: string, parentBreadcrumbs?: BreadcrumbItem[]) => {
      const baseBreadcrumbs = parentBreadcrumbs || [
        { label: "Dashboard", href: "/dashboard" },
      ];

      setBreadcrumbs([...baseBreadcrumbs, { label: title }]);
    },
  };
}
