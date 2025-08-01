import { Github, Globe2, Linkedin, Twitter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { UpdateUserProfileInput } from "@/lib/types/database";

interface ProfileSocialLinksProps {
  formData: UpdateUserProfileInput;
  setFormData: (data: UpdateUserProfileInput) => void;
  isEditing: boolean;
}

export function ProfileSocialLinks({
  formData,
  setFormData,
  isEditing,
}: ProfileSocialLinksProps) {
  return (
    <div className="space-y-4">
      <h4 className="font-medium text-sm text-muted-foreground">
        Social Links
      </h4>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="website" className="flex items-center gap-2">
            <Globe2 className="h-4 w-4" />
            Website
          </Label>
          <Input
            id="website"
            value={formData.website}
            onChange={(e) =>
              setFormData({ ...formData, website: e.target.value })
            }
            disabled={!isEditing}
            placeholder="https://yourwebsite.com"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="twitter_url" className="flex items-center gap-2">
            <Twitter className="h-4 w-4" />
            Twitter
          </Label>
          <Input
            id="twitter_url"
            value={formData.twitter_url}
            onChange={(e) =>
              setFormData({
                ...formData,
                twitter_url: e.target.value,
              })
            }
            disabled={!isEditing}
            placeholder="https://twitter.com/username"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="linkedin_url" className="flex items-center gap-2">
            <Linkedin className="h-4 w-4" />
            LinkedIn
          </Label>
          <Input
            id="linkedin_url"
            value={formData.linkedin_url}
            onChange={(e) =>
              setFormData({
                ...formData,
                linkedin_url: e.target.value,
              })
            }
            disabled={!isEditing}
            placeholder="https://linkedin.com/in/username"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="github_url" className="flex items-center gap-2">
            <Github className="h-4 w-4" />
            GitHub
          </Label>
          <Input
            id="github_url"
            value={formData.github_url}
            onChange={(e) =>
              setFormData({ ...formData, github_url: e.target.value })
            }
            disabled={!isEditing}
            placeholder="https://github.com/username"
          />
        </div>
      </div>
    </div>
  );
}
