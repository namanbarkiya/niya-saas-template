// =====================================================
// PROFILE REACT QUERY HOOKS
// =====================================================
// React Query hooks for profile management operations
// =====================================================
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  PublicProfile,
  UpdateUserProfileInput,
  UserProfile,
} from "@/lib/types/database";
import {
  getMyProfile,
  getProfileCacheKey,
  getPublicProfile,
  getPublicProfiles,
  getPublicProfilesCacheKey,
  invalidateProfileCache,
  markProfileCompleted,
  updateLastSeen,
  updateMyProfile,
} from "@/lib/utils/profile-utils";

// =====================================================
// PROFILE QUERY KEYS
// =====================================================

export const profileQueryKeys = {
  myProfile: () => ["profile", "me"],
  publicProfiles: () => ["profiles", "public"],
  publicProfile: (id: string) => ["profile", "public", id],
  profile: (userId: string) => ["profile", userId],
} as const;

// =====================================================
// MY PROFILE HOOKS
// =====================================================

/**
 * Hook to get the current user's profile
 */
export function useMyProfile() {
  return useQuery({
    queryKey: profileQueryKeys.myProfile(),
    queryFn: getMyProfile,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

/**
 * Hook to update the current user's profile
 */
export function useUpdateMyProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updates: UpdateUserProfileInput) => updateMyProfile(updates),
    onSuccess: (updatedProfile) => {
      // Update the cache with the new profile data
      queryClient.setQueryData(profileQueryKeys.myProfile(), updatedProfile);

      // Invalidate related queries
      queryClient.invalidateQueries({
        queryKey: ["profiles"],
      });
    },
    onError: (error) => {
      console.error("Error updating profile:", error);
      // The error will be handled by the component's onError callback
    },
  });
}

/**
 * Hook to update last seen timestamp
 */
export function useUpdateLastSeen() {
  return useMutation({
    mutationFn: updateLastSeen,
    onError: (error) => {
      console.error("Error updating last seen:", error);
    },
  });
}

/**
 * Hook to mark profile as completed
 */
export function useMarkProfileCompleted() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markProfileCompleted,
    onSuccess: () => {
      // Invalidate profile cache to refetch with updated completion status
      queryClient.invalidateQueries({
        queryKey: profileQueryKeys.myProfile(),
      });
    },
    onError: (error) => {
      console.error("Error marking profile completed:", error);
    },
  });
}

// =====================================================
// PUBLIC PROFILES HOOKS
// =====================================================

/**
 * Hook to get all public profiles
 */
export function usePublicProfiles() {
  return useQuery({
    queryKey: profileQueryKeys.publicProfiles(),
    queryFn: getPublicProfiles,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
}

/**
 * Hook to get a specific public profile
 */
export function usePublicProfile(profileId: string) {
  return useQuery({
    queryKey: profileQueryKeys.publicProfile(profileId),
    queryFn: () => getPublicProfile(profileId),
    enabled: !!profileId,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
}

// =====================================================
// PROFILE UTILITY HOOKS
// =====================================================

/**
 * Hook to get profile with optimistic updates
 */
export function useProfileWithOptimisticUpdate() {
  const { data: profile, isLoading, error } = useMyProfile();
  const updateProfileMutation = useUpdateMyProfile();

  const updateProfileOptimistically = (updates: UpdateUserProfileInput) => {
    if (!profile) return;

    // Optimistically update the cache
    const optimisticProfile = { ...profile, ...updates };

    updateProfileMutation.mutate(updates, {
      onError: () => {
        // On error, we could revert the optimistic update
        // For now, we'll let the query refetch handle it
      },
    });
  };

  return {
    profile,
    isLoading,
    error,
    updateProfile: updateProfileMutation.mutate,
    updateProfileOptimistically,
    isUpdating: updateProfileMutation.isPending,
  };
}

/**
 * Hook to get profile completion status
 */
export function useProfileCompletion() {
  const { data: profile, isLoading } = useMyProfile();

  const completionStatus = profile
    ? {
        isComplete: profile.profile_completed_at !== null,
        hasRequiredFields: !!(profile.full_name && profile.email),
        completionPercentage: calculateCompletionPercentage(profile),
        missingFields: getMissingFields(profile),
      }
    : {
        isComplete: false,
        hasRequiredFields: false,
        completionPercentage: 0,
        missingFields: ["full_name", "email"],
      };

  return {
    profile,
    isLoading,
    ...completionStatus,
  };
}

// =====================================================
// PROFILE PREFETCHING HOOKS
// =====================================================

/**
 * Hook to prefetch profile data
 */
export function usePrefetchProfile() {
  const queryClient = useQueryClient();

  const prefetchMyProfile = () => {
    queryClient.prefetchQuery({
      queryKey: profileQueryKeys.myProfile(),
      queryFn: getMyProfile,
    });
  };

  const prefetchPublicProfiles = () => {
    queryClient.prefetchQuery({
      queryKey: profileQueryKeys.publicProfiles(),
      queryFn: getPublicProfiles,
    });
  };

  const prefetchPublicProfile = (profileId: string) => {
    queryClient.prefetchQuery({
      queryKey: profileQueryKeys.publicProfile(profileId),
      queryFn: () => getPublicProfile(profileId),
    });
  };

  return {
    prefetchMyProfile,
    prefetchPublicProfiles,
    prefetchPublicProfile,
  };
}

// =====================================================
// PROFILE CACHE MANAGEMENT HOOKS
// =====================================================

/**
 * Hook to manage profile cache
 */
export function useProfileCache() {
  const queryClient = useQueryClient();

  const invalidateProfile = (userId?: string) => {
    if (userId) {
      queryClient.invalidateQueries({
        queryKey: profileQueryKeys.profile(userId),
      });
    } else {
      queryClient.invalidateQueries({
        queryKey: profileQueryKeys.myProfile(),
      });
    }
  };

  const invalidateAllProfiles = () => {
    queryClient.invalidateQueries({
      queryKey: ["profiles"],
    });
  };

  const removeProfileFromCache = (userId?: string) => {
    if (userId) {
      queryClient.removeQueries({
        queryKey: profileQueryKeys.profile(userId),
      });
    } else {
      queryClient.removeQueries({
        queryKey: profileQueryKeys.myProfile(),
      });
    }
  };

  return {
    invalidateProfile,
    invalidateAllProfiles,
    removeProfileFromCache,
  };
}

// =====================================================
// UTILITY FUNCTIONS
// =====================================================

/**
 * Calculate profile completion percentage
 */
function calculateCompletionPercentage(profile: UserProfile): number {
  const requiredFields = ["full_name", "email"];
  const recommendedFields = [
    "display_name",
    "bio",
    "avatar_url",
    "company",
    "job_title",
  ];
  const allFields = [...requiredFields, ...recommendedFields];

  const filledFields = allFields.filter((field) => {
    const value = profile[field as keyof UserProfile];
    return value !== null && value !== undefined && value !== "";
  });

  return Math.round((filledFields.length / allFields.length) * 100);
}

/**
 * Get missing required fields
 */
function getMissingFields(profile: UserProfile): string[] {
  const requiredFields = ["full_name", "email"];

  return requiredFields.filter((field) => {
    const value = profile[field as keyof UserProfile];
    return value === null || value === undefined || value === "";
  });
}

// =====================================================
// PROFILE SUBSCRIPTION HOOKS (FOR REAL-TIME UPDATES)
// =====================================================

/**
 * Hook to subscribe to profile changes (if using Supabase real-time)
 */
export function useProfileSubscription(userId?: string) {
  // This would integrate with Supabase real-time subscriptions
  // For now, we'll return a placeholder
  return {
    isSubscribed: false,
    subscribe: () => {
      console.log("Profile subscription not implemented yet");
    },
    unsubscribe: () => {
      console.log("Profile unsubscription not implemented yet");
    },
  };
}
