import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
      retry: (failureCount, error: unknown) => {
        // Don't retry on 4xx errors
        if (error && typeof error === "object" && "status" in error) {
          const status = (error as { status: number }).status;
          if (status >= 400 && status < 500) {
            return false;
          }
        }
        return failureCount < 3;
      },
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: false,
    },
  },
});

// Query keys factory for better organization
export const queryKeys = {
  auth: {
    user: ["auth", "user"] as const,
    session: ["auth", "session"] as const,
  },
  user: {
    profile: (userId: string) => ["user", "profile", userId] as const,
    preferences: (userId: string) => ["user", "preferences", userId] as const,
  },
  // Add more query keys as needed
} as const;
