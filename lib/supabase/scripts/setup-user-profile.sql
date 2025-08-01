-- =====================================================
-- USER PROFILE TABLE SETUP SCRIPT
-- =====================================================
-- This script creates a comprehensive user profile table
-- with automatic triggers for profile creation on signup
-- =====================================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- 1. CREATE USER PROFILES TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS public.user_profiles (
    -- Core identification
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    
    -- Basic information (from auth.users)
    email TEXT NOT NULL,
    full_name TEXT,
    display_name TEXT,
    first_name TEXT,
    last_name TEXT,
    
    -- Contact information
    phone TEXT,
    country TEXT,
    timezone TEXT DEFAULT 'UTC',
    locale TEXT DEFAULT 'en',
    
    -- Profile media
    avatar_url TEXT,
    banner_url TEXT,
    bio TEXT,
    
    -- Social links
    website TEXT,
    twitter_url TEXT,
    linkedin_url TEXT,
    github_url TEXT,
    
    -- Professional information
    company TEXT,
    job_title TEXT,
    industry TEXT,
    
    -- Preferences and settings
    is_public BOOLEAN DEFAULT false,
    email_notifications BOOLEAN DEFAULT true,
    push_notifications BOOLEAN DEFAULT true,
    marketing_emails BOOLEAN DEFAULT false,
    
    -- Metadata
    last_seen_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    profile_completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    CONSTRAINT valid_phone CHECK (phone IS NULL OR phone ~* '^\+?[1-9]\d{1,14}$'),
    CONSTRAINT valid_website CHECK (website IS NULL OR website ~* '^https?://.*'),
    CONSTRAINT valid_social_url CHECK (
        (twitter_url IS NULL OR twitter_url ~* '^https?://(www\.)?twitter\.com/.*') AND
        (linkedin_url IS NULL OR linkedin_url ~* '^https?://(www\.)?linkedin\.com/.*') AND
        (github_url IS NULL OR github_url ~* '^https?://(www\.)?github\.com/.*')
    )
);

-- =====================================================
-- 2. CREATE INDEXES FOR PERFORMANCE
-- =====================================================

-- Index for email lookups
CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON public.user_profiles(email);

-- Index for public profiles
CREATE INDEX IF NOT EXISTS idx_user_profiles_public ON public.user_profiles(is_public) WHERE is_public = true;

-- Index for last seen queries
CREATE INDEX IF NOT EXISTS idx_user_profiles_last_seen ON public.user_profiles(last_seen_at);

-- Index for profile completion
CREATE INDEX IF NOT EXISTS idx_user_profiles_completed ON public.user_profiles(profile_completed_at) WHERE profile_completed_at IS NOT NULL;

-- =====================================================
-- 3. CREATE UPDATED_AT TRIGGER FUNCTION
-- =====================================================

CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- 4. CREATE PROFILE CREATION TRIGGER FUNCTION
-- =====================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.user_profiles (
        user_id,
        email,
        full_name,
        display_name,
        first_name,
        last_name,
        avatar_url,
        created_at,
        updated_at
    ) VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name'),
        COALESCE(NEW.raw_user_meta_data->>'display_name', NEW.raw_user_meta_data->>'name'),
        NEW.raw_user_meta_data->>'first_name',
        NEW.raw_user_meta_data->>'last_name',
        COALESCE(
            NEW.raw_user_meta_data->>'avatar_url',
            NEW.raw_user_meta_data->>'picture',
            NEW.raw_user_meta_data->>'image'
        ),
        NOW(),
        NOW()
    );
    
    RETURN NEW;
EXCEPTION
    WHEN unique_violation THEN
        -- Profile already exists, update it with new auth data
        UPDATE public.user_profiles 
        SET 
            email = NEW.email,
            full_name = COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name'),
            display_name = COALESCE(NEW.raw_user_meta_data->>'display_name', NEW.raw_user_meta_data->>'name'),
            first_name = NEW.raw_user_meta_data->>'first_name',
            last_name = NEW.raw_user_meta_data->>'last_name',
            avatar_url = COALESCE(
                NEW.raw_user_meta_data->>'avatar_url',
                NEW.raw_user_meta_data->>'picture',
                NEW.raw_user_meta_data->>'image'
            ),
            updated_at = NOW()
        WHERE user_id = NEW.id;
        
        RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- 5. CREATE TRIGGERS
-- =====================================================

-- Trigger to update updated_at timestamp
DROP TRIGGER IF EXISTS trigger_handle_updated_at ON public.user_profiles;
CREATE TRIGGER trigger_handle_updated_at
    BEFORE UPDATE ON public.user_profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Trigger to create profile on user signup
DROP TRIGGER IF EXISTS trigger_handle_new_user ON auth.users;
CREATE TRIGGER trigger_handle_new_user
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

-- =====================================================
-- 6. SET UP ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Enable RLS on user_profiles table
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own profile
CREATE POLICY "Users can view own profile" ON public.user_profiles
    FOR SELECT USING (auth.uid() = user_id);

-- Policy: Users can update their own profile
CREATE POLICY "Users can update own profile" ON public.user_profiles
    FOR UPDATE USING (auth.uid() = user_id);

-- Policy: Users can insert their own profile (fallback)
CREATE POLICY "Users can insert own profile" ON public.user_profiles
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policy: Public profiles can be viewed by anyone
CREATE POLICY "Public profiles are viewable by everyone" ON public.user_profiles
    FOR SELECT USING (is_public = true);

-- =====================================================
-- 7. CREATE HELPER FUNCTIONS
-- =====================================================

-- Function to get current user's profile
CREATE OR REPLACE FUNCTION public.get_my_profile()
RETURNS public.user_profiles AS $$
    SELECT * FROM public.user_profiles WHERE user_id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER;

-- Function to update last seen
CREATE OR REPLACE FUNCTION public.update_last_seen()
RETURNS void AS $$
BEGIN
    UPDATE public.user_profiles 
    SET last_seen_at = NOW() 
    WHERE user_id = auth.uid();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to mark profile as completed
CREATE OR REPLACE FUNCTION public.mark_profile_completed()
RETURNS void AS $$
BEGIN
    UPDATE public.user_profiles 
    SET profile_completed_at = NOW() 
    WHERE user_id = auth.uid() AND profile_completed_at IS NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- 8. CREATE VIEWS FOR COMMON QUERIES
-- =====================================================

-- View for public profiles
CREATE OR REPLACE VIEW public.public_profiles AS
SELECT 
    id,
    display_name,
    full_name,
    bio,
    avatar_url,
    banner_url,
    company,
    job_title,
    website,
    twitter_url,
    linkedin_url,
    github_url,
    country,
    created_at
FROM public.user_profiles 
WHERE is_public = true;

-- =====================================================
-- 9. GRANT PERMISSIONS
-- =====================================================

-- Grant permissions to authenticated users
GRANT SELECT, INSERT, UPDATE ON public.user_profiles TO authenticated;
GRANT SELECT ON public.public_profiles TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_my_profile() TO authenticated;
GRANT EXECUTE ON FUNCTION public.update_last_seen() TO authenticated;
GRANT EXECUTE ON FUNCTION public.mark_profile_completed() TO authenticated;

-- Grant permissions to anon users for public profiles
GRANT SELECT ON public.public_profiles TO anon;

-- =====================================================
-- 10. CREATE TYPE DEFINITIONS FOR TYPESCRIPT
-- =====================================================

-- This section documents the TypeScript types that should be generated
-- You can use tools like supabase-cli to generate types automatically

/*
TypeScript types to add to your project:

export interface UserProfile {
  id: string;
  user_id: string;
  email: string;
  full_name?: string;
  display_name?: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  country?: string;
  timezone: string;
  locale: string;
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
  is_public: boolean;
  email_notifications: boolean;
  push_notifications: boolean;
  marketing_emails: boolean;
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
*/

-- =====================================================
-- SCRIPT COMPLETION
-- =====================================================

-- Verify the setup
DO $$
BEGIN
    RAISE NOTICE 'User profile table setup completed successfully!';
    RAISE NOTICE 'Features included:';
    RAISE NOTICE '- Automatic profile creation on user signup';
    RAISE NOTICE '- Row Level Security (RLS) policies';
    RAISE NOTICE '- Data validation constraints';
    RAISE NOTICE '- Performance indexes';
    RAISE NOTICE '- Helper functions for common operations';
    RAISE NOTICE '- Public profile view';
    RAISE NOTICE '- Support for Google Auth and basic Supabase Auth';
END $$; 