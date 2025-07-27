# 📁 FOLDER STRUCTURE GUIDE

## **CURRENT PROJECT STRUCTURE**

```
modern-next-landing/
├── .env                              # Environment variables
├── .gitignore                        # Git ignore rules
├── app/                              # Next.js 15 App Router
│   ├── api/                          # API Routes
│   │   └── auth/
│   │       └── confirm/
│   │           └── route.ts          # Email confirmation endpoint
│   ├── dashboard/                    # Dashboard pages
│   │   ├── layout.tsx               # Dashboard layout with auth guard
│   │   └── page.tsx                 # Dashboard main page
│   ├── error/                        # Error pages
│   │   └── page.tsx                 # Error boundary page
│   ├── favicon.ico                   # Site favicon
│   ├── globals.css                   # Global styles
│   ├── layout.tsx                    # Root layout
│   ├── login/                        # Login pages
│   │   ├── actions.ts               # Server actions for login
│   │   └── page.tsx                 # Login page
│   ├── middleware.ts                 # Next.js middleware for auth
│   ├── page.tsx                      # Landing page
│   ├── robots.ts                     # SEO robots.txt
│   ├── signup/                       # Signup pages
│   │   └── page.tsx                 # Signup page
│   └── sitemap.ts                    # SEO sitemap
├── components/                        # React Components
│   ├── auth/                         # Authentication components
│   │   ├── auth-guard.tsx           # Route protection component
│   │   └── index.ts                 # Auth component exports
│   ├── dashboard/                    # Dashboard components (empty)
│   ├── error/                        # Error components
│   │   ├── error-boundary.tsx       # Error boundary component
│   │   └── index.ts                 # Error component exports
│   ├── forms/                        # Form Components
│   │   ├── auth-form.tsx            # Generic auth form
│   │   ├── form-field.tsx           # Form field component
│   │   ├── form-submit.tsx          # Form submit button
│   │   ├── index.ts                 # Form component exports
│   │   └── login-form.tsx           # Login form component
│   ├── landing/                      # Landing page components
│   │   ├── section-header.tsx       # Section header component
│   │   └── sections/                # Landing sections
│   │       ├── animated-beam-demo.tsx
│   │       ├── animated-list-demo.tsx
│   │       ├── features.tsx         # Features section
│   │       ├── footer.tsx           # Footer section
│   │       ├── hero.tsx             # Hero section
│   │       ├── index.ts             # Section exports
│   │       ├── navbar.tsx           # Navigation bar
│   │       └── tweet-gallery.tsx    # Tweet gallery section
│   ├── providers/                    # Context Providers
│   │   ├── auth-provider.tsx        # Authentication provider
│   │   ├── index.ts                 # Provider exports
│   │   ├── query-provider.tsx       # React Query provider
│   │   └── sonner-provider.tsx      # Toast notification provider
│   ├── seo/                          # SEO components
│   │   └── page-seo.tsx             # Page SEO component
│   └── ui/                           # Base UI Components
│       ├── button.tsx               # Button component
│       ├── calendar.tsx             # Calendar component
│       ├── card.tsx                 # Card component
│       ├── index.ts                 # UI component exports
│       ├── input.tsx                # Input component
│       ├── label.tsx                # Label component
│       └── magicui/                 # Third-party UI components
│           ├── animated-beam.tsx
│           ├── animated-list.tsx
│           ├── animated-shiny-text.tsx
│           ├── aurora-text.tsx
│           ├── bento-grid.tsx
│           ├── dock.tsx
│           ├── interactive-hover-button.tsx
│           ├── marquee.tsx
│           ├── scroll-progress.tsx
│           ├── tweet-card.tsx
│           └── word-rotate.tsx
├── components.json                   # Shadcn/ui configuration
├── env-example.env                   # Environment variables template
├── eslint.config.mjs                 # ESLint configuration
├── lib/                              # Library and Utilities
│   ├── hooks/                        # Custom React Hooks
│   │   ├── index.ts                 # Hook exports
│   │   ├── use-dark-mode.ts         # Dark mode hook
│   ├── index.ts                      # Main library exports
│   ├── query/                        # React Query Setup
│   │   ├── client.ts                # Query client configuration
│   │   ├── error-handler.ts         # Query error handling
│   │   ├── hooks/                   # Query hooks
│   │   │   ├── auth.ts              # Authentication hooks
│   │   │   └── index.ts             # Query hook exports
│   │   └── index.ts                 # Query exports
│   ├── store/                        # State Management
│   │   ├── app-store.ts             # App-wide state store
│   │   ├── atoms/                   # Jotai atoms
│   │   │   ├── index.ts             # Atom exports
│   │   │   └── user-atoms.ts        # User-related atoms
│   │   ├── index.ts                 # Store exports
│   │   ├── ui-store.ts              # UI state store
│   │   └── user-store.ts            # User state store
│   ├── supabase/                     # Supabase Configuration
│   │   ├── client.ts                # Supabase client
│   │   ├── index.ts                 # Supabase exports
│   │   ├── middleware.ts             # Supabase middleware
│   │   └── server.ts                # Supabase server client
│   ├── utils/                        # Utility Functions
│   │   ├── cn.ts                    # Class name utility
│   │   ├── error-handler.ts         # Error handling utilities
│   │   └── index.ts                 # Utility exports
│   └── validations/                  # Zod Schemas
│       ├── auth.ts                   # Authentication schemas
│       └── index.ts                  # Validation exports
├── next-env.d.ts                     # Next.js type definitions
├── next.config.ts                    # Next.js Configuration
├── package-lock.json                 # NPM lock file
├── package.json                      # Dependencies and scripts
├── postcss.config.mjs                # PostCSS configuration
├── project-details/                  # Project documentation
│   ├── folder-structure.md           # This file
│   ├── technical-description.md      # Technical documentation
│   └── todo-list.md                  # Development todo list
├── public/                           # Static Assets
│   ├── file.svg
│   ├── globe.svg
│   ├── manifest.json                 # PWA manifest
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── README.md                         # Project Documentation
└── tsconfig.json                     # TypeScript Configuration
```

## **FOLDER ORGANIZATION PRINCIPLES**

### **1. FEATURE-BASED ORGANIZATION**

- Group related components, hooks, and utilities by feature
- Keep feature-specific code close together
- Use barrel exports for clean imports

### **2. SEPARATION OF CONCERNS**

- UI components in `components/ui/`
- Feature components in `components/features/`
- Business logic in `lib/`
- Types in `types/`

### **3. SCALABILITY**

- Easy to add new features
- Clear import paths
- Modular architecture
- Reusable components

### **4. NEXT.JS 15 BEST PRACTICES**

- Use route groups for organization
- Keep API routes in `app/api/`
- Use server actions in route files
- Implement proper loading and error boundaries

## **IMPORT PATTERNS**

### **Barrel Exports**

```typescript
// ... other exports
// Usage
import { Button, Input, Label } from "@/components/ui";

// components/ui/index.ts
export { Button } from "./button";
export { Input } from "./input";
export { Label } from "./label";
```

### **Feature Imports**

```typescript
// Usage
import { AuthGuard, LoginButton } from "@/components/features/auth";

// components/features/auth/index.ts
export { AuthGuard } from "./auth-guard";
export { AuthProvider } from "./auth-provider";
export { LoginButton } from "./login-button";
```

### **Library Imports**

```typescript
// Usage
import { cn, useAuth, userStore } from "@/lib";

// lib/index.ts
export * from "./store";
export * from "./hooks";
export * from "./utils";
export * from "./validations";
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
