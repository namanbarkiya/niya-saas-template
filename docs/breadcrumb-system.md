# Global Breadcrumb System

This document describes the global breadcrumb system that automatically generates breadcrumbs based on the current route, with support for custom breadcrumbs when needed.

## Overview

The breadcrumb system is built with:

- **Zustand Store**: Manages breadcrumb state globally
- **Auto-generation**: Automatically creates breadcrumbs from routes
- **Custom Support**: Allows manual breadcrumb setting when needed
- **TypeScript**: Fully typed for better development experience

## Architecture

### 1. Breadcrumb Store (`lib/store/breadcrumb-store.ts`)

The store manages breadcrumb state and provides auto-generation based on routes:

```typescript
interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ComponentType<{ className?: string }>;
}
```

**Features:**

- Automatic route-based breadcrumb generation
- Support for dynamic routes with parameters
- Fallback generation for unknown routes
- Persistence across page reloads

### 2. Global Breadcrumb Component (`components/dashboard/layout/global-breadcrumb.tsx`)

Automatically renders breadcrumbs based on the current route:

```tsx
<GlobalBreadcrumb />
```

**Features:**

- Listens to route changes
- Only renders for dashboard routes
- Handles navigation and current page states

### 3. Custom Breadcrumb Hook (`lib/hooks/use-breadcrumbs.ts`)

Provides easy access to breadcrumb functionality:

```typescript
const { setBreadcrumbs, setPageTitle, breadcrumbs } = useBreadcrumbs();
```

## Usage

### Automatic Breadcrumbs (Default)

The system automatically generates breadcrumbs for known routes:

```typescript
// Route: /dashboard/account
// Generated: Dashboard > Account

// Route: /dashboard/projects/123
// Generated: Dashboard > Projects > Project 123
```

### Custom Breadcrumbs

For pages that need custom breadcrumbs, use the `WithBreadcrumbs` component:

```tsx
import { WithBreadcrumbs } from "@/components/dashboard/layout/with-breadcrumbs";

export default function MyPage() {
  return (
    <WithBreadcrumbs
      breadcrumbs={[
        { label: "Dashboard", href: "/dashboard" },
        { label: "My Section", href: "/dashboard/my-section" },
        { label: "Custom Page" },
      ]}
    >
      <MyPageContent />
    </WithBreadcrumbs>
  );
}
```

### Using the Hook

For more control, use the `useBreadcrumbs` hook:

```tsx
import { useBreadcrumbs } from "@/lib/hooks/use-breadcrumbs";

function MyComponent() {
  const { setBreadcrumbs, setPageTitle } = useBreadcrumbs();

  useEffect(() => {
    // Set custom breadcrumbs
    setBreadcrumbs([
      { label: "Dashboard", href: "/dashboard" },
      { label: "Custom", href: "/dashboard/custom" },
      { label: "Current Page" },
    ]);

    // Or use the convenience method
    setPageTitle("My Custom Page", [
      { label: "Dashboard", href: "/dashboard" },
      { label: "Section", href: "/dashboard/section" },
    ]);
  }, []);

  return <div>My Component</div>;
}
```

## Route Configuration

### Static Routes

Add routes to the `routeConfig` in `breadcrumb-store.ts`:

```typescript
const routeConfig: Record<string, BreadcrumbItem[]> = {
  "/dashboard/analytics": [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Analytics", href: "/dashboard/analytics" },
  ],
};
```

### Dynamic Routes

Add patterns for parameterized routes:

```typescript
const dynamicRoutePatterns = [
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
];
```

## Examples

### Basic Page (Auto-generated)

```tsx
// app/dashboard/page.tsx
export default function DashboardPage() {
  return <div>Dashboard Content</div>;
}
// Breadcrumbs: Dashboard
```

### Custom Breadcrumbs

```tsx
// app/dashboard/settings/page.tsx
import { WithBreadcrumbs } from "@/components/dashboard/layout/with-breadcrumbs";

export default function SettingsPage() {
  return (
    <WithBreadcrumbs
      breadcrumbs={[
        { label: "Dashboard", href: "/dashboard" },
        { label: "Settings", href: "/dashboard/settings" },
      ]}
    >
      <div>Settings Content</div>
    </WithBreadcrumbs>
  );
}
```

### Dynamic Content

```tsx
// app/dashboard/projects/[id]/page.tsx
import { useBreadcrumbs } from "@/lib/hooks/use-breadcrumbs";

export default function ProjectPage({ params }: { params: { id: string } }) {
  const { setBreadcrumbs } = useBreadcrumbs();

  useEffect(() => {
    setBreadcrumbs([
      { label: "Dashboard", href: "/dashboard" },
      { label: "Projects", href: "/dashboard/projects" },
      { label: `Project ${params.id}` },
    ]);
  }, [params.id]);

  return <div>Project {params.id}</div>;
}
```

## Best Practices

1. **Use Auto-generation**: Let the system handle breadcrumbs automatically for standard routes
2. **Custom for Complex Pages**: Use `WithBreadcrumbs` for pages with complex navigation
3. **Consistent Labels**: Use consistent, user-friendly labels
4. **Proper Hrefs**: Always provide hrefs for navigation items
5. **Icons**: Add icons when they improve UX (optional)

## Integration

The system is already integrated into the dashboard layout:

```tsx
// app/dashboard/layout.tsx
<header>
  <GlobalBreadcrumb />
</header>
```

No additional setup is required for basic usage.

## Extending

To add new route patterns:

1. Add to `routeConfig` for static routes
2. Add to `dynamicRoutePatterns` for dynamic routes
3. Update the store if needed

The system is designed to be easily extensible while maintaining simplicity for common use cases.
