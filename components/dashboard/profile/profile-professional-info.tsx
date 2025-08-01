import { Briefcase, Building } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { UpdateUserProfileInput } from "@/lib/types/database";

interface ProfileProfessionalInfoProps {
  formData: UpdateUserProfileInput;
  setFormData: (data: UpdateUserProfileInput) => void;
  isEditing: boolean;
}

export function ProfileProfessionalInfo({
  formData,
  setFormData,
  isEditing,
}: ProfileProfessionalInfoProps) {
  return (
    <div className="space-y-4">
      <h4 className="font-medium text-sm text-muted-foreground">
        Professional Information
      </h4>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="company" className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            Company
          </Label>
          <Input
            id="company"
            value={formData.company}
            onChange={(e) =>
              setFormData({ ...formData, company: e.target.value })
            }
            disabled={!isEditing}
            placeholder="Company name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="job_title" className="flex items-center gap-2">
            <Briefcase className="h-4 w-4" />
            Job Title
          </Label>
          <Input
            id="job_title"
            value={formData.job_title}
            onChange={(e) =>
              setFormData({ ...formData, job_title: e.target.value })
            }
            disabled={!isEditing}
            placeholder="Software Engineer"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="industry">Industry</Label>
          <Input
            id="industry"
            value={formData.industry}
            onChange={(e) =>
              setFormData({ ...formData, industry: e.target.value })
            }
            disabled={!isEditing}
            placeholder="Technology"
          />
        </div>
      </div>

      {/* Bio */}
      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          value={formData.bio}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          disabled={!isEditing}
          placeholder="Tell us about yourself..."
          rows={3}
        />
      </div>
    </div>
  );
}
