/**
 * Client-side profile utilities.
 * Now delegates to the REST API instead of calling Supabase directly.
 */
import { usersApi } from "@/lib/api/users";
import type {
  ProfileCompletionStatus,
  UpdateUserProfileInput,
  UserProfile,
} from "@/lib/types/database";
import {
  RECOMMENDED_PROFILE_FIELDS,
  REQUIRED_PROFILE_FIELDS,
} from "@/lib/types/database";

// ---------------------------------------------------------------------------
// API-backed operations
// ---------------------------------------------------------------------------

export async function getMyProfile(): Promise<UserProfile | null> {
  try {
    const data = await usersApi.me();
    return data.profile as unknown as UserProfile | null;
  } catch {
    return null;
  }
}

export async function updateMyProfile(
  updates: UpdateUserProfileInput
): Promise<UserProfile> {
  const data = await usersApi.updateProfile(updates as Parameters<typeof usersApi.updateProfile>[0]);
  if (!data.profile) throw new Error("No profile data returned");
  return data.profile as unknown as UserProfile;
}

/** Placeholder — update last seen via a lightweight profile patch. */
export async function updateLastSeen(): Promise<void> {
  try {
    await usersApi.updateProfile({});
  } catch {
    /* non-critical */
  }
}

/** Placeholder — mark profile completed (set profile_completed_at on backend). */
export async function markProfileCompleted(): Promise<void> {
  try {
    await usersApi.updateProfile({});
  } catch {
    /* non-critical */
  }
}

/** Public profiles are fetched via backend; stub returns [] for now. */
export async function getPublicProfiles(): Promise<unknown[]> {
  return [];
}

/** Public profile by ID — stub. */
export async function getPublicProfile(_id: string): Promise<unknown | null> {
  return null;
}

// ---------------------------------------------------------------------------
// Pure utilities (no network calls — unchanged)
// ---------------------------------------------------------------------------

export function calculateProfileCompletion(
  profile: UserProfile | null
): ProfileCompletionStatus {
  if (!profile) {
    return {
      isComplete: false,
      missingFields: [...REQUIRED_PROFILE_FIELDS],
      completionPercentage: 0,
    };
  }

  const allFields = [...REQUIRED_PROFILE_FIELDS, ...RECOMMENDED_PROFILE_FIELDS];
  const filled = allFields.filter((f) => {
    const v = profile[f as keyof UserProfile];
    return v !== null && v !== undefined && v !== "";
  });
  const missing = allFields.filter((f) => {
    const v = profile[f as keyof UserProfile];
    return v === null || v === undefined || v === "";
  });

  return {
    isComplete: REQUIRED_PROFILE_FIELDS.every((f) => {
      const v = profile[f as keyof UserProfile];
      return v !== null && v !== undefined && v !== "";
    }),
    missingFields: missing,
    completionPercentage: Math.round((filled.length / allFields.length) * 100),
  };
}

export function validateProfileData(data: Partial<UserProfile>): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (data.email && !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(data.email))
    errors.push("Invalid email format");
  if (data.phone && !/^\+?[1-9]\d{1,14}$/.test(data.phone))
    errors.push("Invalid phone number format");
  if (data.website && !/^https?:\/\/.*/.test(data.website))
    errors.push("Website must start with http:// or https://");
  if (data.full_name && data.full_name.length > 100)
    errors.push("Full name must be less than 100 characters");
  if (data.bio && data.bio.length > 500)
    errors.push("Bio must be less than 500 characters");
  if (!data.full_name || data.full_name.trim() === "")
    errors.push("Full name is required");

  return { isValid: errors.length === 0, errors };
}

export function formatProfileData(profile: UserProfile) {
  return {
    displayName: profile.display_name || profile.full_name || "Anonymous",
    fullName: profile.full_name || "",
    avatarUrl: profile.avatar_url || "",
    bio: profile.bio || "",
    socialLinks: {
      website: profile.website || "",
      twitter: profile.twitter_url || "",
      linkedin: profile.linkedin_url || "",
      github: profile.github_url || "",
    },
    professionalInfo: {
      company: profile.company || "",
      jobTitle: profile.job_title || "",
      industry: profile.industry || "",
    },
  };
}

export function getProfileInitials(profile: UserProfile): string {
  if (profile.first_name && profile.last_name) {
    return `${profile.first_name[0]}${profile.last_name[0]}`.toUpperCase();
  }
  if (profile.full_name) {
    const names = profile.full_name.split(" ");
    if (names.length >= 2)
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    return profile.full_name[0]?.toUpperCase() || "?";
  }
  if (profile.display_name) return profile.display_name[0]?.toUpperCase() || "?";
  return "?";
}

export function isProfilePublic(profile: UserProfile | null): boolean {
  return profile?.is_public || false;
}

export function getProfileVisibility(profile: UserProfile | null): "public" | "private" {
  return profile?.is_public ? "public" : "private";
}

export function getProfileCacheKey(userId: string): string {
  return `profile:${userId}`;
}

export function getPublicProfilesCacheKey(): string {
  return "public_profiles";
}

export function invalidateProfileCache(_userId: string): void {
  // Handled by React Query invalidation in hooks
}
