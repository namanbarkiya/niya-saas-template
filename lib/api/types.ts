// =============================================================================
// Shared API types — mirror the backend Pydantic response models
// =============================================================================

export interface UserResponse {
  id: string;
  email: string;
  email_verified: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  last_login_at: string | null;
}

export interface ProfileResponse {
  id: string;
  user_id: string;
  full_name: string | null;
  display_name: string | null;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  country: string | null;
  timezone: string;
  locale: string;
  avatar_url: string | null;
  banner_url: string | null;
  bio: string | null;
  website: string | null;
  twitter_url: string | null;
  linkedin_url: string | null;
  github_url: string | null;
  company: string | null;
  job_title: string | null;
  industry: string | null;
  is_public: boolean;
  email_notifications: boolean;
  push_notifications: boolean;
  marketing_emails: boolean;
  last_seen_at: string;
  profile_completed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: UserResponse;
  profile: ProfileResponse | null;
}

export interface MeResponse {
  user: UserResponse;
  profile: ProfileResponse | null;
}

export interface ApiError {
  status: "error";
  message: string;
}

export interface SignUpPayload {
  email: string;
  password: string;
  name?: string;
}

export interface SignInPayload {
  email: string;
  password: string;
}

export interface UpdateProfilePayload {
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

export interface ChangePasswordPayload {
  current_password: string;
  new_password: string;
}
