// =====================================================
// PROFILE UTILITY FUNCTIONS (CLIENT-SIDE)
// =====================================================
// Utility functions for profile management and database operations
// =====================================================
import { createClient } from "@/lib/supabase/client";
import type {
  CreateUserProfileInput,
  ProfileCompletionStatus,
  PublicProfile,
  UpdateUserProfileInput,
  UserProfile,
} from "@/lib/types/database";
import {
  RECOMMENDED_PROFILE_FIELDS,
  REQUIRED_PROFILE_FIELDS,
} from "@/lib/types/database";

// =====================================================
// CLIENT-SIDE PROFILE OPERATIONS
// =====================================================

/**
 * Get the current user's profile
 */
export async function getMyProfile(): Promise<UserProfile | null> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase.rpc("get_my_profile");

    if (error) {
      console.error("Error fetching profile:", error);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Error in getMyProfile:", error);
    return null;
  }
}

/**
 * Update the current user's profile
 */
export async function updateMyProfile(
  updates: UpdateUserProfileInput
): Promise<UserProfile> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("user_profiles")
      .update(updates)
      .eq("user_id", (await supabase.auth.getUser()).data.user?.id)
      .select()
      .single();

    if (error) {
      console.error("Error updating profile:", error);
      
      // Handle specific error types
      if (error.code === "23505") {
        throw new Error("A profile with this information already exists");
      } else if (error.code === "23514") {
        throw new Error("Invalid data provided. Please check your input.");
      } else if (error.code === "42P01") {
        throw new Error("Profile table not found. Please contact support.");
      } else if (error.message) {
        throw new Error(error.message);
      } else {
        throw new Error("Failed to update profile");
      }
    }

    if (!data) {
      throw new Error("No profile data returned");
    }

    return data;
  } catch (error) {
    console.error("Error in updateMyProfile:", error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to update profile");
  }
}

/**
 * Update last seen timestamp
 */
export async function updateLastSeen(): Promise<void> {
  try {
    const supabase = createClient();
    await supabase.rpc("update_last_seen");
  } catch (error) {
    console.error("Error updating last seen:", error);
  }
}

/**
 * Mark profile as completed
 */
export async function markProfileCompleted(): Promise<void> {
  try {
    const supabase = createClient();
    await supabase.rpc("mark_profile_completed");
  } catch (error) {
    console.error("Error marking profile completed:", error);
  }
}

/**
 * Get public profiles
 */
export async function getPublicProfiles(): Promise<PublicProfile[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("public_profiles")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching public profiles:", error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("Error in getPublicProfiles:", error);
    return [];
  }
}

/**
 * Get a specific public profile by ID
 */
export async function getPublicProfile(
  profileId: string
): Promise<PublicProfile | null> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("public_profiles")
      .select("*")
      .eq("id", profileId)
      .single();

    if (error) {
      console.error("Error fetching public profile:", error);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Error in getPublicProfile:", error);
    return null;
  }
}

// =====================================================
// PROFILE VALIDATION & UTILITIES
// =====================================================

/**
 * Calculate profile completion status
 */
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
  const filledFields = allFields.filter((field) => {
    const value = profile[field as keyof UserProfile];
    return value !== null && value !== undefined && value !== "";
  });

  const missingFields = [...allFields].filter((field) => {
    const value = profile[field as keyof UserProfile];
    return value === null || value === undefined || value === "";
  });

  const completionPercentage = Math.round(
    (filledFields.length / allFields.length) * 100
  );
  const isComplete = REQUIRED_PROFILE_FIELDS.every((field) => {
    const value = profile[field as keyof UserProfile];
    return value !== null && value !== undefined && value !== "";
  });

  return {
    isComplete,
    missingFields,
    completionPercentage,
  };
}

/**
 * Validate profile data
 */
export function validateProfileData(data: Partial<UserProfile>): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  // Email validation
  if (
    data.email &&
    !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(data.email)
  ) {
    errors.push("Invalid email format");
  }

  // Phone validation
  if (data.phone && !/^\+?[1-9]\d{1,14}$/.test(data.phone)) {
    errors.push("Invalid phone number format");
  }

  // Website validation
  if (data.website && !/^https?:\/\/.*/.test(data.website)) {
    errors.push("Website must start with http:// or https://");
  }

  // Social media URL validation
  if (
    data.twitter_url &&
    !/^https?:\/\/(www\.)?twitter\.com\/.*/.test(data.twitter_url)
  ) {
    errors.push("Invalid Twitter URL format");
  }

  if (
    data.linkedin_url &&
    !/^https?:\/\/(www\.)?linkedin\.com\/.*/.test(data.linkedin_url)
  ) {
    errors.push("Invalid LinkedIn URL format");
  }

  if (
    data.github_url &&
    !/^https?:\/\/(www\.)?github\.com\/.*/.test(data.github_url)
  ) {
    errors.push("Invalid GitHub URL format");
  }

  // Length validations
  if (data.full_name && data.full_name.length > 100) {
    errors.push("Full name must be less than 100 characters");
  }

  if (data.display_name && data.display_name.length > 50) {
    errors.push("Display name must be less than 50 characters");
  }

  if (data.bio && data.bio.length > 500) {
    errors.push("Bio must be less than 500 characters");
  }

  if (data.company && data.company.length > 100) {
    errors.push("Company name must be less than 100 characters");
  }

  if (data.job_title && data.job_title.length > 100) {
    errors.push("Job title must be less than 100 characters");
  }

  if (data.industry && data.industry.length > 50) {
    errors.push("Industry must be less than 50 characters");
  }

  // Required field validation
  if (!data.full_name || data.full_name.trim() === "") {
    errors.push("Full name is required");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Format profile data for display
 */
export function formatProfileData(profile: UserProfile): {
  displayName: string;
  fullName: string;
  avatarUrl: string;
  bio: string;
  socialLinks: { [key: string]: string };
  professionalInfo: { [key: string]: string };
} {
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

/**
 * Get profile initials for avatar fallback
 */
export function getProfileInitials(profile: UserProfile): string {
  if (profile.first_name && profile.last_name) {
    return `${profile.first_name[0]}${profile.last_name[0]}`.toUpperCase();
  }

  if (profile.full_name) {
    const names = profile.full_name.split(" ");
    if (names.length >= 2) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return profile.full_name[0]?.toUpperCase() || "?";
  }

  if (profile.display_name) {
    return profile.display_name[0]?.toUpperCase() || "?";
  }

  return "?";
}

/**
 * Check if profile is public
 */
export function isProfilePublic(profile: UserProfile | null): boolean {
  return profile?.is_public || false;
}

/**
 * Get profile visibility status
 */
export function getProfileVisibility(
  profile: UserProfile | null
): "public" | "private" {
  return profile?.is_public ? "public" : "private";
}

// =====================================================
// PROFILE CACHE UTILITIES
// =====================================================

/**
 * Cache key for profile data
 */
export function getProfileCacheKey(userId: string): string {
  return `profile:${userId}`;
}

/**
 * Cache key for public profiles
 */
export function getPublicProfilesCacheKey(): string {
  return "public_profiles";
}

/**
 * Invalidate profile cache
 */
export function invalidateProfileCache(userId: string): void {
  // This would integrate with your caching solution
  // For now, we'll just log the invalidation
  console.log(`Invalidating cache for user: ${userId}`);
}

// =====================================================
// PROFILE MIGRATION UTILITIES
// =====================================================

/**
 * Migrate existing user data to new profile format
 */
export async function migrateUserToProfile(
  userId: string,
  userData: Record<string, unknown>
): Promise<UserProfile | null> {
  try {
    const supabase = createClient();

    const profileData: CreateUserProfileInput = {
      user_id: userId,
      email: (userData.email as string) || "",
      full_name:
        (userData.full_name as string) || (userData.name as string) || "",
      display_name:
        (userData.display_name as string) || (userData.name as string) || "",
      first_name: (userData.first_name as string) || "",
      last_name: (userData.last_name as string) || "",
      avatar_url:
        (userData.avatar_url as string) ||
        (userData.picture as string) ||
        (userData.image as string) ||
        "",
      timezone: (userData.timezone as string) || "UTC",
      locale: (userData.locale as string) || "en",
    };

    const { data, error } = await supabase
      .from("user_profiles")
      .upsert(profileData)
      .select()
      .single();

    if (error) {
      console.error("Error migrating user to profile:", error);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Error in migrateUserToProfile:", error);
    return null;
  }
}
