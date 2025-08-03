"use client";

import { useEffect } from "react";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useBreadcrumbStore } from "@/lib/store/breadcrumb-store";

export function GlobalBreadcrumb() {
  const pathname = usePathname();
  const { items, generateBreadcrumbs } = useBreadcrumbStore();

  // Generate breadcrumbs when pathname changes
  useEffect(() => {
    if (pathname) {
      generateBreadcrumbs(pathname);
    }
  }, [pathname, generateBreadcrumbs]);

  // Don't render breadcrumbs for non-dashboard routes
  if (!pathname?.startsWith("/dashboard")) {
    return null;
  }

  // Don't render if no breadcrumb items
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem>
              {index === items.length - 1 ? (
                // Last item - current page
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              ) : (
                // Navigation item
                <BreadcrumbLink asChild>
                  <Link href={item.href || "#"}>{item.label}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {index < items.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
