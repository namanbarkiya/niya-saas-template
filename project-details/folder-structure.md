# 📁 FOLDER STRUCTURE GUIDE

## **RECOMMENDED PROJECT STRUCTURE**

```
modern-next-landing/
├── app/                          # Next.js 15 App Router
│   ├── api/                      # API Routes
│   ├── dashboard/                # Dashboard pages
│   ├── login/                    # Login page
│   ├── signup/                   # Signup page
│   ├── error/                    # Error pages
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   ├── middleware.ts             # Next.js middleware
│   ├── page.tsx                  # Landing page
│   ├── robots.ts                 # SEO
│   └── sitemap.ts               # SEO
├── components/                    # React Components
│   ├── ui/                       # Base UI Components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── card.tsx
│   │   ├── calendar.tsx
│   │   ├── magicui/              # Third-party UI components
│   │   └── index.ts
│   ├── forms/                    # Form Components
│   │   ├── auth-form.tsx
│   │   ├── form-field.tsx
│   │   ├── form-submit.tsx
│   │   ├── login-form.tsx
│   │   └── index.ts
│   ├── landing/                  # Landing page components
│   │   ├── sections/             # Landing sections
│   │   │   ├── hero.tsx
│   │   │   ├── navbar.tsx
│   │   │   ├── features.tsx
│   │   │   ├── footer.tsx
│   │   │   ├── tweet-gallery.tsx
│   │   │   ├── animated-beam-demo.tsx
│   │   │   ├── animated-list-demo.tsx
│   │   │   └── index.ts
│   │   └── section-header.tsx
│   ├── auth/                     # Authentication components
│   │   ├── auth-guard.tsx
│   │   └── index.ts
│   ├── error/                    # Error components
│   │   ├── error-boundary.tsx
│   │   └── index.ts
│   ├── providers/                # Context Providers
│   │   ├── auth-provider.tsx
│   │   ├── query-provider.tsx
│   │   ├── sonner-provider.tsx
│   │   └── index.ts
│   └── seo/                      # SEO components
│       └── page-seo.tsx
├── lib/                          # Library and Utilities
│   ├── utils/                    # Utility Functions
│   │   ├── cn.ts                 # Class name utility
│   │   ├── error-handler.ts      # Error handling
│   │   └── index.ts
│   ├── hooks/                    # Custom React Hooks
│   │   ├── use-error-handler.ts
│   │   ├── use-dark-mode.ts
│   │   └── index.ts
│   ├── store/                    # State Management
│   │   ├── user-store.ts
│   │   ├── ui-store.ts
│   │   ├── app-store.ts
│   │   ├── atoms/
│   │   └── index.ts
│   ├── validations/              # Zod Schemas
│   │   ├── auth.ts
│   │   └── index.ts
│   ├── supabase/                 # Supabase Configuration
│   │   ├── client.ts
│   │   ├── server.ts
│   │   ├── middleware.ts
│   │   └── index.ts
│   ├── query/                    # React Query Setup
│   │   ├── client.ts
│   │   ├── error-handler.ts
│   │   ├── hooks/
│   │   └── index.ts
│   └── index.ts                  # Main library exports
├── public/                       # Static Assets
├── next.config.ts                # Next.js Configuration
├── tsconfig.json                 # TypeScript Configuration
├── package.json                  # Dependencies
└── README.md                     # Project Documentation
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
