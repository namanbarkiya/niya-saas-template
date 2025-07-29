"use client";

import { useEffect } from "react";
import { useBreadcrumbs } from "@/lib/hooks/use-breadcrumbs";
import { BreadcrumbItem } from "@/lib/store/breadcrumb-store";

interface WithBreadcrumbsProps {
  breadcrumbs: BreadcrumbItem[];
  children: React.ReactNode;
}

export function WithBreadcrumbs({
  breadcrumbs,
  children,
}: WithBreadcrumbsProps) {
  const { setBreadcrumbs } = useBreadcrumbs();

  useEffect(() => {
    setBreadcrumbs(breadcrumbs);

    // Cleanup: restore auto-generated breadcrumbs when component unmounts
    return () => {
      // This will be handled by the GlobalBreadcrumb component
      // when the route changes
    };
  }, [breadcrumbs, setBreadcrumbs]);

  return <>{children}</>;
}

// Higher-order component for pages
export function withBreadcrumbs<T extends object>(
  WrappedComponent: React.ComponentType<T>,
  breadcrumbs: BreadcrumbItem[]
) {
  return function WithBreadcrumbsHOC(props: T) {
    return (
      <WithBreadcrumbs breadcrumbs={breadcrumbs}>
        <WrappedComponent {...props} />
      </WithBreadcrumbs>
    );
  };
}
