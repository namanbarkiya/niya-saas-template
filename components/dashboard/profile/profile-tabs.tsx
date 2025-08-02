"use client";

import { useState } from "react";
import { ChevronDown, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { UpdateUserProfileInput, UserProfile } from "@/lib/types/database";
import { ProfileAvatar } from "./profile-avatar";
import { ProfileBasicInfo } from "./profile-basic-info";
import { ProfileContactInfo } from "./profile-contact-info";
import { ProfilePrivacySettings } from "./profile-privacy-settings";
import { ProfileProfessionalInfo } from "./profile-professional-info";
import { ProfileSocialLinks } from "./profile-social-links";

interface ProfileTabsProps {
  profile: UserProfile | null;
  user: { name?: string; email?: string; avatar_url?: string } | null;
  formData: UpdateUserProfileInput;
  setFormData: (data: UpdateUserProfileInput) => void;
  onSave: () => void;
  isSaving: boolean;
}

const tabOptions = [
  { value: "basic", label: "Basic Information" },
  { value: "contact", label: "Contact Information" },
  { value: "professional", label: "Professional Details" },
  { value: "social", label: "Social Links" },
  { value: "privacy", label: "Privacy Settings" },
];

export function ProfileTabs({
  profile,
  user,
  formData,
  setFormData,
  onSave,
  isSaving,
}: ProfileTabsProps) {
  const [activeTab, setActiveTab] = useState("basic");

  const displayName =
    profile?.display_name || profile?.full_name || user?.name || "Anonymous";
  const avatarUrl = profile?.avatar_url || user?.avatar_url;

  const currentTabLabel =
    tabOptions.find((tab) => tab.value === activeTab)?.label ||
    "Basic Information";

  return (
    <div>
      <div className="mb-6">
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
              <div className="flex-1 text-center sm:text-left">
                <CardTitle className="text-lg sm:text-xl">
                  Account Details
                </CardTitle>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Manage your personal information and preferences
                </p>
              </div>
              <ProfileAvatar
                displayName={displayName}
                avatarUrl={avatarUrl}
                profile={profile}
                user={user}
              />
            </div>
          </CardHeader>
          <CardContent>
            {/* Mobile Dropdown */}
            <div className="block sm:hidden mb-6">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    {currentTabLabel}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full">
                  {tabOptions.map((option) => (
                    <DropdownMenuItem
                      key={option.value}
                      onClick={() => setActiveTab(option.value)}
                      className={activeTab === option.value ? "bg-accent" : ""}
                    >
                      {option.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Desktop Tabs */}
            <div className="hidden sm:block">
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="basic">Basic</TabsTrigger>
                  <TabsTrigger value="contact">Contact</TabsTrigger>
                  <TabsTrigger value="professional">Professional</TabsTrigger>
                  <TabsTrigger value="social">Social</TabsTrigger>
                  <TabsTrigger value="privacy">Privacy</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Tab Content */}
            <div className="mt-6">
              {activeTab === "basic" && (
                <div className="space-y-6">
                  <ProfileBasicInfo
                    formData={formData}
                    setFormData={setFormData}
                    isEditing={true}
                  />
                </div>
              )}

              {activeTab === "contact" && (
                <div className="space-y-6">
                  <ProfileContactInfo
                    formData={formData}
                    setFormData={setFormData}
                    isEditing={true}
                  />
                </div>
              )}

              {activeTab === "professional" && (
                <div className="space-y-6">
                  <ProfileProfessionalInfo
                    formData={formData}
                    setFormData={setFormData}
                    isEditing={true}
                  />
                </div>
              )}

              {activeTab === "social" && (
                <div className="space-y-6">
                  <ProfileSocialLinks
                    formData={formData}
                    setFormData={setFormData}
                    isEditing={true}
                  />
                </div>
              )}

              {activeTab === "privacy" && (
                <div className="space-y-6">
                  <ProfilePrivacySettings
                    formData={formData}
                    setFormData={setFormData}
                    isEditing={true}
                  />
                </div>
              )}
            </div>
            <div className="flex items-center justify-between mb-4">
              <Button
                onClick={onSave}
                disabled={isSaving}
                className="flex items-center gap-2 mt-4"
              >
                <Save className="h-4 w-4" />
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
