"use client";

import { useEffect, useState } from "react";
import { Edit, Save, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUpdateMyProfile } from "@/lib/query/hooks/profile";
import { User } from "@/lib/store/user-store";
import type { UpdateUserProfileInput, UserProfile } from "@/lib/types/database";
import { validateProfileData } from "@/lib/utils/profile-utils";
import { ProfileAvatar } from "./profile-avatar";
import { ProfileBasicInfo } from "./profile-basic-info";
import { ProfileContactInfo } from "./profile-contact-info";
import { ProfilePrivacySettings } from "./profile-privacy-settings";
import { ProfileProfessionalInfo } from "./profile-professional-info";
import { ProfileSocialLinks } from "./profile-social-links";

interface ProfileFormProps {
  profile: UserProfile;
  user: User;
  formData: UpdateUserProfileInput;
  setFormData: (data: UpdateUserProfileInput) => void;
}

export function ProfileForm({
  profile,
  user,
  formData,
  setFormData,
}: ProfileFormProps) {
  const updateProfileMutation = useUpdateMyProfile();
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    // Client-side validation
    const validation = validateProfileData(formData);
    if (!validation.isValid) {
      toast.error(`Validation errors: ${validation.errors.join(", ")}`);
      return;
    }

    updateProfileMutation.mutate(formData, {
      onSuccess: () => {
        toast.success("Profile updated successfully!");
        setIsEditing(false);
      },
      onError: (error) => {
        console.error("Error updating profile:", error);
        toast.error("Failed to update profile");
      },
    });
  };

  const handleCancel = () => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || "",
        display_name: profile.display_name || "",
        first_name: profile.first_name || "",
        last_name: profile.last_name || "",
        phone: profile.phone || "",
        country: profile.country || "",
        timezone: profile.timezone || "UTC",
        locale: profile.locale || "en",
        bio: profile.bio || "",
        website: profile.website || "",
        twitter_url: profile.twitter_url || "",
        linkedin_url: profile.linkedin_url || "",
        github_url: profile.github_url || "",
        company: profile.company || "",
        job_title: profile.job_title || "",
        industry: profile.industry || "",
        is_public: profile.is_public || false,
        email_notifications: profile.email_notifications ?? true,
        push_notifications: profile.push_notifications ?? true,
        marketing_emails: profile.marketing_emails ?? false,
      });
    }
    setIsEditing(false);
  };

  const displayName =
    profile?.display_name || profile?.full_name || user?.name || "Anonymous";
  const avatarUrl = profile?.avatar_url || user?.avatar_url;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">Profile Information</CardTitle>
            <CardDescription>
              Your personal information and account details
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-2"
          >
            {isEditing ? (
              <>
                <X className="h-4 w-4" />
                Cancel
              </>
            ) : (
              <>
                <Edit className="h-4 w-4" />
                Edit
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Avatar Section */}
        <ProfileAvatar
          displayName={displayName}
          avatarUrl={avatarUrl}
          profile={profile}
          user={user}
        />

        {/* Form Fields */}
        <div className="grid gap-6 md:grid-cols-2">
          <ProfileBasicInfo
            formData={formData}
            setFormData={setFormData}
            isEditing={isEditing}
          />
          <ProfileContactInfo
            formData={formData}
            setFormData={setFormData}
            isEditing={isEditing}
          />
        </div>

        <ProfileProfessionalInfo
          formData={formData}
          setFormData={setFormData}
          isEditing={isEditing}
        />

        <ProfileSocialLinks
          formData={formData}
          setFormData={setFormData}
          isEditing={isEditing}
        />

        <ProfilePrivacySettings
          formData={formData}
          setFormData={setFormData}
          isEditing={isEditing}
        />

        {/* Save/Cancel Buttons */}
        {isEditing && (
          <div className="flex gap-3 pt-4">
            <Button
              onClick={handleSave}
              className="flex items-center gap-2"
              disabled={updateProfileMutation.isPending}
            >
              <Save className="h-4 w-4" />
              {updateProfileMutation.isPending ? "Saving..." : "Save Changes"}
            </Button>
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
