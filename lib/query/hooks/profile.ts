import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { usersApi } from "@/lib/api/users";
import type { ProfileResponse, UpdateProfilePayload } from "@/lib/api/types";

export const profileQueryKeys = {
  myProfile: () => ["profile", "me"],
  publicProfiles: () => ["profiles", "public"],
  publicProfile: (id: string) => ["profile", "public", id],
} as const;

// ---------------------------------------------------------------------------
// My profile
// ---------------------------------------------------------------------------
export function useMyProfile() {
  return useQuery({
    queryKey: profileQueryKeys.myProfile(),
    queryFn: async (): Promise<ProfileResponse | null> => {
      const data = await usersApi.me();
      return data.profile;
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

export function useUpdateMyProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updates: UpdateProfilePayload) =>
      usersApi.updateProfile(updates),
    onSuccess: (data) => {
      queryClient.setQueryData(profileQueryKeys.myProfile(), data.profile);
      queryClient.invalidateQueries({ queryKey: ["profiles"] });
    },
    onError: (error) => {
      console.error("Error updating profile:", error);
    },
  });
}

export function useUpdateLastSeen() {
  return useMutation({
    mutationFn: () => usersApi.updateProfile({ }),
    onError: (error) => console.error("Error updating last seen:", error),
  });
}

// ---------------------------------------------------------------------------
// Profile completion utilities
// ---------------------------------------------------------------------------
export function useProfileCompletion() {
  const { data: profile, isLoading } = useMyProfile();

  const completionStatus = profile
    ? {
        isComplete: !!profile.profile_completed_at,
        hasRequiredFields: !!profile.full_name,
        completionPercentage: _calcCompletion(profile),
        missingFields: _missingFields(profile),
      }
    : {
        isComplete: false,
        hasRequiredFields: false,
        completionPercentage: 0,
        missingFields: ["full_name"],
      };

  return { profile, isLoading, ...completionStatus };
}

function _calcCompletion(p: ProfileResponse): number {
  const fields: (keyof ProfileResponse)[] = [
    "full_name",
    "display_name",
    "bio",
    "avatar_url",
    "company",
    "job_title",
  ];
  const filled = fields.filter((f) => p[f] !== null && p[f] !== undefined && p[f] !== "").length;
  return Math.round((filled / fields.length) * 100);
}

function _missingFields(p: ProfileResponse): string[] {
  return (["full_name"] as (keyof ProfileResponse)[]).filter(
    (f) => !p[f]
  ) as string[];
}

// ---------------------------------------------------------------------------
// Cache management
// ---------------------------------------------------------------------------
export function useProfileCache() {
  const queryClient = useQueryClient();

  return {
    invalidateProfile: () =>
      queryClient.invalidateQueries({ queryKey: profileQueryKeys.myProfile() }),
    invalidateAllProfiles: () =>
      queryClient.invalidateQueries({ queryKey: ["profiles"] }),
    removeProfileFromCache: () =>
      queryClient.removeQueries({ queryKey: profileQueryKeys.myProfile() }),
  };
}

// ---------------------------------------------------------------------------
// Real-time subscription placeholder (implement with WebSocket when needed)
// ---------------------------------------------------------------------------
export function useProfileSubscription(_userId?: string) {
  return {
    isSubscribed: false,
    subscribe: () => {},
    unsubscribe: () => {},
  };
}
