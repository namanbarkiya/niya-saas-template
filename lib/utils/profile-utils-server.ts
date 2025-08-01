// =====================================================
// PROFILE UTILITY FUNCTIONS (SERVER-SIDE)
// =====================================================
// Server-side utility functions for profile management
// =====================================================
import { createClient } from "@/lib/supabase/server";
import type { UpdateUserProfileInput, UserProfile } from "@/lib/types/database";

// =====================================================
// SERVER-SIDE PROFILE OPERATIONS
// =====================================================

/**
 * Get user profile on server side
 */
export async function getServerUserProfile(
  userId: string
): Promise<UserProfile | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("user_profiles")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (error) {
      console.error("Error fetching server profile:", error);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Error in getServerUserProfile:", error);
    return null;
  }
}

/**
 * Update user profile on server side
 */
export async function updateServerUserProfile(
  userId: string,
  updates: UpdateUserProfileInput
): Promise<UserProfile | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("user_profiles")
      .update(updates)
      .eq("user_id", userId)
      .select()
      .single();

    if (error) {
      console.error("Error updating server profile:", error);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Error in updateServerUserProfile:", error);
    return null;
  }
}

/**
 * Get all user profiles (admin function)
 */
export async function getAllUserProfiles(): Promise<UserProfile[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("user_profiles")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching all profiles:", error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("Error in getAllUserProfiles:", error);
    return [];
  }
}

/**
 * Delete user profile (admin function)
 */
export async function deleteUserProfile(userId: string): Promise<boolean> {
  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from("user_profiles")
      .delete()
      .eq("user_id", userId);

    if (error) {
      console.error("Error deleting profile:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error in deleteUserProfile:", error);
    return false;
  }
}
