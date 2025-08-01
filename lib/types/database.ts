// =====================================================
// DATABASE TYPES FOR USER PROFILES
// =====================================================
// These types correspond to the database schema created in
// scripts/setup-user-profile.sql
// =====================================================

export interface UserProfile {
  // Core identification
  id: string;
  user_id: string;

  // Basic information (from auth.users)
  email: string;
  full_name?: string;
  display_name?: string;
  first_name?: string;
  last_name?: string;

  // Contact information
  phone?: string;
  country?: string;
  timezone: string;
  locale: string;

  // Profile media
  avatar_url?: string;
  banner_url?: string;
  bio?: string;

  // Social links
  website?: string;
  twitter_url?: string;
  linkedin_url?: string;
  github_url?: string;

  // Professional information
  company?: string;
  job_title?: string;
  industry?: string;

  // Preferences and settings
  is_public: boolean;
  email_notifications: boolean;
  push_notifications: boolean;
  marketing_emails: boolean;

  // Metadata
  last_seen_at: string;
  profile_completed_at?: string;
  created_at: string;
  updated_at: string;
}

export interface PublicProfile {
  id: string;
  display_name?: string;
  full_name?: string;
  bio?: string;
  avatar_url?: string;
  banner_url?: string;
  company?: string;
  job_title?: string;
  website?: string;
  twitter_url?: string;
  linkedin_url?: string;
  github_url?: string;
  country?: string;
  created_at: string;
}

export interface CreateUserProfileInput {
  user_id: string;
  email: string;
  full_name?: string;
  display_name?: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  country?: string;
  timezone?: string;
  locale?: string;
  avatar_url?: string;
  banner_url?: string;
  bio?: string;
  website?: string;
  twitter_url?: string;
  linkedin_url?: string;
  github_url?: string;
  company?: string;
  job_title?: string;
  industry?: string;
  is_public?: boolean;
  email_notifications?: boolean;
  push_notifications?: boolean;
  marketing_emails?: boolean;
}

export interface UpdateUserProfileInput {
  full_name?: string;
  display_name?: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  country?: string;
  timezone?: string;
  locale?: string;
  avatar_url?: string;
  banner_url?: string;
  bio?: string;
  website?: string;
  twitter_url?: string;
  linkedin_url?: string;
  github_url?: string;
  company?: string;
  job_title?: string;
  industry?: string;
  is_public?: boolean;
  email_notifications?: boolean;
  push_notifications?: boolean;
  marketing_emails?: boolean;
}

// Profile completion status
export interface ProfileCompletionStatus {
  isComplete: boolean;
  missingFields: string[];
  completionPercentage: number;
}

// Profile visibility options
export type ProfileVisibility = "public" | "private" | "friends";

// Notification preferences
export interface NotificationPreferences {
  email_notifications: boolean;
  push_notifications: boolean;
  marketing_emails: boolean;
}

// Social media links
export interface SocialLinks {
  website?: string;
  twitter_url?: string;
  linkedin_url?: string;
  github_url?: string;
}

// Professional information
export interface ProfessionalInfo {
  company?: string;
  job_title?: string;
  industry?: string;
}

// Contact information
export interface ContactInfo {
  phone?: string;
  country?: string;
  timezone: string;
  locale: string;
}

// Profile media
export interface ProfileMedia {
  avatar_url?: string;
  banner_url?: string;
  bio?: string;
}

// Database table names
export const DATABASE_TABLES = {
  USER_PROFILES: "user_profiles",
  PUBLIC_PROFILES: "public_profiles",
} as const;

// Database function names
export const DATABASE_FUNCTIONS = {
  GET_MY_PROFILE: "get_my_profile",
  UPDATE_LAST_SEEN: "update_last_seen",
  MARK_PROFILE_COMPLETED: "mark_profile_completed",
} as const;

// Validation schemas for form inputs
export const PROFILE_VALIDATION_SCHEMAS = {
  // Email validation regex
  EMAIL_REGEX: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,

  // Phone validation regex
  PHONE_REGEX: /^\+?[1-9]\d{1,14}$/,

  // Website validation regex
  WEBSITE_REGEX: /^https?:\/\/.*/,

  // Social media URL patterns
  TWITTER_REGEX: /^https?:\/\/(www\.)?twitter\.com\/.*/,
  LINKEDIN_REGEX: /^https?:\/\/(www\.)?linkedin\.com\/.*/,
  GITHUB_REGEX: /^https?:\/\/(www\.)?github\.com\/.*/,
} as const;

// Default values
export const PROFILE_DEFAULTS = {
  timezone: "UTC",
  locale: "en",
  is_public: false,
  email_notifications: true,
  push_notifications: true,
  marketing_emails: false,
} as const;

// Profile field categories for organization
export const PROFILE_FIELD_CATEGORIES = {
  BASIC_INFO: ["full_name", "display_name", "first_name", "last_name", "email"],
  CONTACT: ["phone", "country", "timezone", "locale"],
  MEDIA: ["avatar_url", "banner_url", "bio"],
  SOCIAL: ["website", "twitter_url", "linkedin_url", "github_url"],
  PROFESSIONAL: ["company", "job_title", "industry"],
  PREFERENCES: [
    "is_public",
    "email_notifications",
    "push_notifications",
    "marketing_emails",
  ],
} as const;

// Required fields for profile completion
export const REQUIRED_PROFILE_FIELDS = ["email", "full_name"] as const;

// Optional but recommended fields
export const RECOMMENDED_PROFILE_FIELDS = [
  "display_name",
  "bio",
  "avatar_url",
  "company",
  "job_title",
] as const;
