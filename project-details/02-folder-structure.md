# 📁 FOLDER STRUCTURE GUIDE

## **RECOMMENDED PROJECT STRUCTURE**

```
modern-next-landing/
├── app/                          # Next.js 15 App Router
│   ├── (auth)/                   # Route groups for auth pages
│   │   ├── login/
│   │   │   ├── page.tsx
│   │   │   └── actions.ts
│   │   └── signup/
│   │       ├── page.tsx
│   │       └── actions.ts
│   ├── (dashboard)/              # Route groups for dashboard
│   │   ├── dashboard/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   └── loading.tsx
│   │   ├── profile/
│   │   │   ├── page.tsx
│   │   │   └── actions.ts
│   │   └── settings/
│   │       ├── page.tsx
│   │       └── actions.ts
│   ├── (landing)/                # Route groups for landing pages
│   │   ├── page.tsx
│   │   └── about/
│   │       └── page.tsx
│   ├── api/                      # API Routes
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   │   └── route.ts
│   │   │   ├── logout/
│   │   │   │   └── route.ts
│   │   │   └── refresh/
│   │   │       └── route.ts
│   │   ├── users/
│   │   │   ├── route.ts
│   │   │   └── [id]/
│   │   │       └── route.ts
│   │   └── webhooks/
│   │       └── supabase/
│   │           └── route.ts
│   ├── error.tsx                 # Global error boundary
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   ├── loading.tsx               # Global loading
│   ├── middleware.ts              # Next.js middleware
│   └── not-found.tsx             # 404 page
├── components/                    # React Components
│   ├── ui/                       # Base UI Components (shadcn/ui style)
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── modal.tsx
│   │   ├── toast.tsx
│   │   ├── tooltip.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── form.tsx
│   │   ├── select.tsx
│   │   ├── checkbox.tsx
│   │   ├── radio-group.tsx
│   │   ├── switch.tsx
│   │   ├── textarea.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   ├── avatar.tsx
│   │   ├── progress.tsx
│   │   ├── skeleton.tsx
│   │   ├── separator.tsx
│   │   ├── tabs.tsx
│   │   ├── accordion.tsx
│   │   ├── alert.tsx
│   │   ├── alert-dialog.tsx
│   │   ├── calendar.tsx
│   │   ├── date-picker.tsx
│   │   ├── popover.tsx
│   │   ├── sheet.tsx
│   │   ├── table.tsx
│   │   ├── pagination.tsx
│   │   └── index.ts              # Barrel exports
│   ├── forms/                    # Form Components
│   │   ├── form-field.tsx
│   │   ├── form-section.tsx
│   │   ├── form-error.tsx
│   │   ├── form-success.tsx
│   │   ├── form-submit.tsx
│   │   ├── login-form.tsx
│   │   ├── signup-form.tsx
│   │   ├── profile-form.tsx
│   │   └── index.ts
│   ├── layout/                   # Layout Components
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   ├── sidebar.tsx
│   │   ├── navigation.tsx
│   │   ├── breadcrumb.tsx
│   │   ├── page-header.tsx
│   │   └── index.ts
│   ├── features/                 # Feature-specific Components
│   │   ├── auth/                 # Authentication features
│   │   │   ├── auth-guard.tsx
│   │   │   ├── auth-provider.tsx
│   │   │   ├── login-button.tsx
│   │   │   ├── logout-button.tsx
│   │   │   └── index.ts
│   │   ├── dashboard/            # Dashboard features
│   │   │   ├── dashboard-layout.tsx
│   │   │   ├── dashboard-nav.tsx
│   │   │   ├── stats-card.tsx
│   │   │   ├── activity-feed.tsx
│   │   │   ├── quick-actions.tsx
│   │   │   └── index.ts
│   │   ├── landing/              # Landing page features
│   │   │   ├── hero-section.tsx
│   │   │   ├── features-section.tsx
│   │   │   ├── testimonials.tsx
│   │   │   ├── pricing-section.tsx
│   │   │   ├── cta-section.tsx
│   │   │   └── index.ts
│   │   └── shared/               # Shared features
│   │       ├── theme-toggle.tsx
│   │       ├── language-selector.tsx
│   │       ├── search-bar.tsx
│   │       ├── notification-bell.tsx
│   │       └── index.ts
│   └── providers/                # Context Providers
│       ├── auth-provider.tsx
│       ├── theme-provider.tsx
│       ├── query-provider.tsx
│       ├── store-provider.tsx
│       └── index.ts
├── lib/                          # Library and Utilities
│   ├── store/                    # State Management
│   │   ├── user-store.ts
│   │   ├── ui-store.ts
│   │   ├── app-store.ts
│   │   ├── atoms/                # Jotai atoms
│   │   │   ├── auth-atoms.ts
│   │   │   ├── theme-atoms.ts
│   │   │   ├── form-atoms.ts
│   │   │   ├── navigation-atoms.ts
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── hooks/                    # Custom React Hooks
│   │   ├── use-auth.ts
│   │   ├── use-theme.ts
│   │   ├── use-form.ts
│   │   ├── use-api.ts
│   │   ├── use-local-storage.ts
│   │   ├── use-debounce.ts
│   │   ├── use-throttle.ts
│   │   ├── use-media-query.ts
│   │   ├── use-keyboard-shortcuts.ts
│   │   └── index.ts
│   ├── api/                      # API Functions
│   │   ├── auth.ts
│   │   ├── users.ts
│   │   ├── dashboard.ts
│   │   ├── notifications.ts
│   │   ├── types.ts
│   │   └── index.ts
│   ├── validations/              # Zod Schemas
│   │   ├── auth-schemas.ts
│   │   ├── user-schemas.ts
│   │   ├── form-schemas.ts
│   │   ├── api-schemas.ts
│   │   └── index.ts
│   ├── utils/                    # Utility Functions
│   │   ├── cn.ts                 # Class name utility
│   │   ├── format.ts             # Formatting utilities
│   │   ├── validation.ts         # Validation utilities
│   │   ├── constants.ts          # App constants
│   │   ├── helpers.ts            # Helper functions
│   │   └── index.ts
│   ├── supabase/                 # Supabase Configuration
│   │   ├── client.ts
│   │   ├── server.ts
│   │   ├── middleware.ts
│   │   ├── types.ts
│   │   └── index.ts
│   ├── query/                    # React Query Setup
│   │   ├── client.ts
│   │   ├── hooks/
│   │   │   ├── auth-hooks.ts
│   │   │   ├── user-hooks.ts
│   │   │   └── index.ts
│   │   └── index.ts
│   └── constants/                # Application Constants
│       ├── routes.ts
│       ├── api-endpoints.ts
│       ├── validation-messages.ts
│       ├── theme.ts
│       └── index.ts
├── types/                        # TypeScript Type Definitions
│   ├── auth.ts
│   ├── user.ts
│   ├── api.ts
│   ├── forms.ts
│   ├── ui.ts
│   ├── supabase.ts
│   └── index.ts
├── styles/                       # Global Styles
│   ├── globals.css
│   ├── components.css
│   ├── utilities.css
│   └── themes.css
├── public/                       # Static Assets
│   ├── images/
│   ├── icons/
│   ├── fonts/
│   └── favicon.ico
├── tests/                        # Test Files
│   ├── __mocks__/
│   ├── components/
│   ├── hooks/
│   ├── utils/
│   └── setup.ts
├── docs/                         # Documentation
│   ├── api/
│   ├── components/
│   ├── architecture/
│   └── deployment.md
├── scripts/                      # Build and Utility Scripts
│   ├── build.ts
│   ├── dev.ts
│   └── deploy.ts
├── .env.example                  # Environment Variables Example
├── .env.local                    # Local Environment Variables
├── .env.production               # Production Environment Variables
├── .env.development              # Development Environment Variables
├── next.config.ts                # Next.js Configuration
├── tailwind.config.ts            # Tailwind CSS Configuration
├── tsconfig.json                 # TypeScript Configuration
├── package.json                  # Dependencies
├── README.md                     # Project Documentation
└── project-details/              # Project Planning
    ├── 01-todo-list.md
    ├── 02-folder-structure.md
    └── 03-technical-description.md
```

## **FOLDER ORGANIZATION PRINCIPLES**

### **1. FEATURE-BASED ORGANIZATION**

-   Group related components, hooks, and utilities by feature
-   Keep feature-specific code close together
-   Use barrel exports for clean imports

### **2. SEPARATION OF CONCERNS**

-   UI components in `components/ui/`
-   Feature components in `components/features/`
-   Business logic in `lib/`
-   Types in `types/`

### **3. SCALABILITY**

-   Easy to add new features
-   Clear import paths
-   Modular architecture
-   Reusable components

### **4. NEXT.JS 15 BEST PRACTICES**

-   Use route groups for organization
-   Keep API routes in `app/api/`
-   Use server actions in route files
-   Implement proper loading and error boundaries

## **IMPORT PATTERNS**

### **Barrel Exports**

```typescript
// components/ui/index.ts
export { Button } from "./button";
export { Input } from "./input";
export { Label } from "./label";
// ... other exports

// Usage
import { Button, Input, Label } from "@/components/ui";
```

### **Feature Imports**

```typescript
// components/features/auth/index.ts
export { AuthGuard } from "./auth-guard";
export { AuthProvider } from "./auth-provider";
export { LoginButton } from "./login-button";

// Usage
import { AuthGuard, LoginButton } from "@/components/features/auth";
```

### **Library Imports**

```typescript
// lib/index.ts
export * from "./store";
export * from "./hooks";
export * from "./utils";
export * from "./validations";

// Usage
import { useAuth, cn, userStore } from "@/lib";
```

## **MIGRATION STRATEGY**

### **Phase 1: Create New Structure**

1. Create new folders following the structure
2. Move existing files to appropriate locations
3. Update import paths
4. Add barrel exports

### **Phase 2: Implement New Features**

1. Add state management stores
2. Implement validation schemas
3. Create new UI components
4. Add custom hooks

### **Phase 3: Refactor Existing Code**

1. Update existing components to use new structure
2. Implement proper error handling
3. Add loading states
4. Improve TypeScript types

## **BENEFITS OF THIS STRUCTURE**

1. **Maintainability**: Clear organization makes code easy to find and modify
2. **Scalability**: Easy to add new features without affecting existing code
3. **Reusability**: Components and utilities can be easily shared
4. **Type Safety**: Proper TypeScript organization
5. **Performance**: Optimized imports and code splitting
6. **Developer Experience**: Clear patterns and conventions
